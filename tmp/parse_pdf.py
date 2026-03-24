import sys

try:
    import fitz
    doc = fitz.open(sys.argv[1])
    text = ""
    for page in doc:
        text += page.get_text()
    with open("C:/Users/ADMIN/SommersStore/tmp/pdf_out.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("fitz ok")
except ImportError:
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(sys.argv[1])
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open("C:/Users/ADMIN/SommersStore/tmp/pdf_out.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("PyPDF2 ok")
    except ImportError:
        print("No pdf library")
