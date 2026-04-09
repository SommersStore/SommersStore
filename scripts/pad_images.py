import re

file_path = r'c:\Users\ADMIN\SommersStore\projects\loja-digital\app\ebook\cofre-v2\data\chapters.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def pad_ingredients(match):
    block = match.group(0)
    # Procurar por todos os objetos dentro da lista
    items = re.findall(r'\{[^\}]+\}', block)
    current_count = len(items)
    
    if current_count < 6:
        padding = ''
        for i in range(6 - current_count):
            padding += f'          {{ name: "Elemento Extra {current_count + i + 1}", quantity: "Marcação", imagePath: "/ebook/botanical.png" }},\n'
        
        # Inserir o padding antes do fechamento `],`
        idx = block.rfind('        ],')
        if idx != -1:
            return block[:idx] + padding + block[idx:]
            
    return block

# Encontra blocos de ingredientImages que terminam com `],` indentados com 8 espaços
new_content = re.sub(r'ingredientImages:\s*\[[\s\S]*? {8}\],', pad_ingredients, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Preenchimento de ingredientes concluído!")
