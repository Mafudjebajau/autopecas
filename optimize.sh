#!/bin/bash
# -------------------------------------------
# Otimizador de imagens para React/Vite/Next
# Autor: Mr 49 + GPT-5
# -------------------------------------------

ASSETS_DIR="./src/assets"
SIZES=(150 300 600)
QUALITY=85

echo "📸 Otimizando imagens em: $ASSETS_DIR"
echo "-------------------------------------------"

# Testa dependências
if ! command -v convert &>/dev/null; then
  echo "❌ Erro: o comando 'convert' (ImageMagick) não foi encontrado."
  echo "   Instale com: sudo apt install imagemagick -y"
  exit 1
fi

if ! command -v cwebp &>/dev/null; then
  echo "❌ Erro: o comando 'cwebp' (WebP Tools) não foi encontrado."
  echo "   Instale com: sudo apt install webp -y"
  exit 1
fi

# Loop nas imagens
find "$ASSETS_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img; do
  BASENAME=$(basename "$img")
  NAME="${BASENAME%.*}"
  EXT="${BASENAME##*.}"

  # Ignora imagens que já são redimensionadas
  if [[ "$NAME" =~ -[0-9]+$ ]]; then

    continue
  fi

  echo "🖼️ Processando: $BASENAME"

  for SIZE in "${SIZES[@]}"; do
    PNG_OUT="${ASSETS_DIR}/${NAME}-${SIZE}.png"
    WEBP_OUT="${ASSETS_DIR}/${NAME}-${SIZE}.webp"

    # Gera PNG redimensionado
    if [ ! -f "$PNG_OUT" ]; then
      convert "$img" -resize "${SIZE}" -quality "$QUALITY" "$PNG_OUT"
      echo "   ➤ PNG ${SIZE}px gerado"
    fi

    # Gera WebP
    if [ ! -f "$WEBP_OUT" ]; then
      cwebp "$PNG_OUT" -q "$QUALITY" -o "$WEBP_OUT" >/dev/null 2>&1
      echo "   ➤ WEBP ${SIZE}px gerado"
    fi
  done
done

echo "-------------------------------------------"
echo "✅ Otimização concluída!"
