from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def generate_kit_vendas_pdf():
    output_path = r'C:\Users\ADMIN\Downloads\Kit_Vendas_Final.pdf'
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#043927'),
        alignment=TA_CENTER,
        spaceAfter=20,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#C5A059'),
        alignment=TA_CENTER,
        spaceAfter=30,
        fontName='Helvetica-Oblique'
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitleStyle',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=colors.HexColor('#043927'),
        spaceBefore=15,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontSize=11,
        leading=16,
        spaceAfter=12,
        fontName='Helvetica'
    )

    content = []
    
    # 1. Title and Intro
    content.append(Paragraph("Kit de Vendas: Sais de Banho Terapêuticos", title_style))
    content.append(Paragraph("Do Conhecimento à Venda — Um Fluxo Claro e Replicável", subtitle_style))
    content.append(Spacer(1, 12))
    content.append(Paragraph("Este guia foi criado para ser o seu mapa de implementação. Uma sequência lógica para você vender seus sais de banho todos os dias, com elegância e profissionalismo.", body_style))
    content.append(Spacer(1, 20))

    # 2. Section 1
    content.append(Paragraph("1. O Mapa do Sucesso: Fluxo de 7 Etapas", section_title_style))
    etapas = [
        "<b>1. Atrair:</b> Posts de curiosidade no Instagram que educam sobre os benefícios.",
        "<b>2. Despertar Interesse:</b> Engajamento nos stories e comentários estratégicos.",
        "<b>3. Conexão via WhatsApp:</b> Onde a conversa de verdade acontece.",
        "<b>4. Qualificar:</b> Perguntas simples para entender a dor/necessidade da cliente.",
        "<b>5. Conectar:</b> Mostrar que você entende o problema dela antes de oferecer.",
        "<b>6. Apresentar a Oferta:</b> Mostrar o produto certo para a necessidade dela.",
        "<b>7. Fechar:</b> Conduzir ao checkout com segurança e clareza."
    ]
    for etapa in etapas:
        content.append(Paragraph(etapa, body_style))

    content.append(Spacer(1, 20))

    # 3. Section 2
    content.append(Paragraph("2. Biblioteca de Scripts: Redes Sociais", section_title_style))
    content.append(Paragraph("<b>Posts para o Feed</b>", body_style))
    content.append(Paragraph("- <b>Atrair:</b> \"Você sabia que seu banho pode ser um ritual de cura? Descobri como transformar água e sais em um portal de relaxamento.\"", body_style))
    content.append(Paragraph("- <b>Conectar:</b> \"Depois de um dia exaustivo, o que sua mente mais pede? Equilíbrio. Meus blends artesanais foram feitos para esse momento.\"", body_style))
    content.append(Paragraph("- <b>Desejo:</b> \"Sal marinho + Óleos Essenciais + Botânicos. A alquimia perfeita para quem não abre mão do autocuidado.\"", body_style))
    
    content.append(Spacer(1, 10))
    content.append(Paragraph("<b>Sequência de Stories (O Funil Mágico)</b>", body_style))
    stories = [
        "1. <b>Pergunta:</b> \"Você já sentiu o poder de um banho terapêutico?\"",
        "2. <b>Identificação:</b> \"Se o estresse tem sido seu companheiro, isso é pra você.\"",
        "3. <b>Bastidores:</b> Mostre a produção, as ervas e a textura dos sais.",
        "4. <b>Chamada (CTA):</b> \"Preparei alguns blends exclusivos. Digite 'QUERO' para ver o catálogo.\""
    ]
    for story in stories:
        content.append(Paragraph(story, body_style))

    content.append(Spacer(1, 20))

    # 4. Section 3
    content.append(Paragraph("3. Scripts de WhatsApp: Do Oi ao 'Vendido!'", section_title_style))
    content.append(Paragraph("<b>Primeiro Contato:</b> \"Olá! Que bom seu interesse nos nossos sais terapêuticos. Para eu te indicar o melhor blend, me conte: você busca mais relaxamento, energia ou alívio de alguma dor específica?\"", body_style))
    content.append(Paragraph("<b>Apresentação da Oferta:</b> \"Com base no que você me contou, o [Nome do Produto] é ideal para você. Ele ajuda especificamente em [Benefício]. Posso separar uma unidade para você?\"", body_style))
    content.append(Paragraph("<b>Fechamento Direto:</b> \"Trabalhamos com [Formas de Pagamento]. A entrega é feita em [Prazo]. Posso confirmar o seu pedido agora para garantir o envio hoje?\"", body_style))

    content.append(Spacer(1, 20))

    # 5. Section 4 (Table)
    content.append(Paragraph("4. Vencendo Objeções com Classe", section_title_style))
    data = [
        ['Objeção', 'Resposta que Converte'],
        ['"Vou pensar"', '"Claro! Posso te enviar um resumo para ajudar na decisão? Nossos lotes saem rápido."'],
        ['"Tá caro"', '"Entendo! É uma experiência de spa em casa, com óleos puros, não apenas sal comum."'],
        ['"Nunca usei"', '"Muitas começam assim! Recomendo o blend equilibrado para quem está iniciando."'],
        ['"Depois vejo"', '"Combinado! Quer que eu te avise quando tivermos reposição desse aroma?"']
    ]
    table = Table(data, colWidths=[100, 350])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#043927')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#C5A059')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
    ]))
    content.append(table)
    content.append(Spacer(1, 20))

    # 6. Section 5
    content.append(Paragraph("5. Rotina Diária de Vendas (O Hábito Próspero)", section_title_style))
    rotina = [
        "- <b>Manhã:</b> 1 Post no Feed + 3 Stories de bastidores/curiosidade.",
        "- <b>Tarde:</b> Responder comentários e encaminhar interessados para o WhatsApp.",
        "- <b>Final da Tarde:</b> Fazer o 'Follow-up' de quem não finalizou a compra ontem.",
        "- <b>Noite:</b> Registrar resultados e planejar as postagens do dia seguinte."
    ]
    for r in rotina:
        content.append(Paragraph(r, body_style))

    content.append(Spacer(1, 30))
    content.append(Paragraph("6. Mensagem Final", section_title_style))
    content.append(Paragraph("Você não precisa ser perfeita, precisa ser constante. Siga este fluxo todos os dias e transforme sua paixão por sais em uma fonte real de renda e transformação para suas clientes.", body_style))
    content.append(Paragraph("<b>Comece hoje. Venda amanhã.</b>", title_style))

    doc.build(content)
    print(f"SUCCESS: PDF generated at {output_path}")

if __name__ == "__main__":
    generate_kit_vendas_pdf()
