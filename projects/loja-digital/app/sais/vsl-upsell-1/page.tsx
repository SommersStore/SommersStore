"use client";
import VSLLayout from './components/VSLLayout';

/**
 * VERSÃO VENCEDORA SELECIONADA:
 * Desktop: Vídeo à Direita
 * Mobile: Vídeo ANTES do texto
 */
export default function OTOVideoPage() {
    return (
        <VSLLayout 
            videoPosition="right" 
            mobileOrder="before" 
            version="Versão Oficial: Vídeo Direita / Mobile Antes" 
        />
    );
}
