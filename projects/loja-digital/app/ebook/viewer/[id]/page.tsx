import ViewerClient from "./ViewerClient";

export function generateStaticParams() {
  return [
    { id: "cofre" },
    { id: "sinergias" },
    { id: "fornecedores" },
    { id: "ritual-noite" },
  ];
}

export default async function DynamicEbookViewer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ViewerClient id={id} />;
}
