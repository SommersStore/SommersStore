import os
from pypdf import PdfReader

pdf_path = r"C:\Users\ADMIN\SommersStore\projects\loja-digital\sales\content\Método Essência Ativa BR_Livro.pdf"
output_dir = r"C:\Users\ADMIN\SommersStore\projects\loja-digital\sales\content\extracted_images"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

reader = PdfReader(pdf_path)
count = 0

for page_index, page in enumerate(reader.pages):
    for image_file_object in page.images:
        count += 1
        with open(os.path.join(output_dir, f"image_{page_index}_{count}_{image_file_object.name}"), "wb") as fp:
            fp.write(image_file_object.data)

print(f"Extracted {count} images to {output_dir}")
