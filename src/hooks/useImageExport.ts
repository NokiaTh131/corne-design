import { useCallback } from 'react';
import html2canvas from 'html2canvas';

export const useImageExport = () => {
  const exportAsImage = useCallback(async (elementId: string, filename: string = 'keyboard-design') => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error('Element not found');
        return;
      }

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  }, []);

  return { exportAsImage };
};