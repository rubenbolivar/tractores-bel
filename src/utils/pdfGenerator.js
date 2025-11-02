import { jsPDF } from 'jspdf';

export const generateFinancingPDF = (tractor, plan, calculation, asesor) => {
  const doc = new jsPDF();
  
  // Configuración de colores BEL
  const belGreen = [54, 124, 43];
  const belYellow = [255, 222, 0];
  const darkGray = [51, 51, 51];
  const lightGray = [128, 128, 128];
  
  let yPos = 20;
  
  // Header con logo y título
  doc.setFillColor(...belGreen);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TRACTORES BEL', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Cotización de Financiamiento', 105, 30, { align: 'center' });
  
  yPos = 50;
  
  // Información del Tractor
  doc.setTextColor(...darkGray);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Tractor Seleccionado', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Modelo: ${tractor.modelo} ${tractor.subtitulo ? '- ' + tractor.subtitulo : ''}`, 20, yPos);
  
  yPos += 7;
  doc.text(`Potencia: ${tractor.potencia} HP`, 20, yPos);
  
  yPos += 7;
  doc.text(`Categoría: ${tractor.categoria}`, 20, yPos);
  
  yPos += 7;
  doc.text(`Precio Base: $${tractor.precio.toLocaleString('en-US')}`, 20, yPos);
  
  yPos += 15;
  
  // Línea separadora
  doc.setDrawColor(...belGreen);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  
  // Plan de Financiamiento
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Plan de Financiamiento', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Plan: ${plan.nombre}`, 20, yPos);
  
  yPos += 7;
  doc.setTextColor(...lightGray);
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(plan.descripcion, 170);
  doc.text(descLines, 20, yPos);
  yPos += descLines.length * 5;
  
  yPos += 10;
  
  // Desglose Financiero
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Desglose Financiero', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Tabla de desglose
  const tableData = [
    ['Concepto', 'Monto'],
    ['Precio Base', `$${calculation.precioBase.toLocaleString('en-US')}`],
  ];
  
  if (calculation.inicial > 0) {
    tableData.push(['Inicial', `$${calculation.inicial.toLocaleString('en-US')}`]);
  }
  
  if (calculation.iva > 0) {
    tableData.push(['IVA (16%)', `$${calculation.iva.toLocaleString('en-US')}`]);
  }
  
  if (calculation.igtf > 0) {
    tableData.push(['IGTF (3%)', `$${calculation.igtf.toLocaleString('en-US')}`]);
  }
  
  if (calculation.placa > 0) {
    tableData.push(['Placa/Registro', `$${calculation.placa.toLocaleString('en-US')}`]);
  }
  
  if (calculation.cuotaMensual > 0) {
    const numCuotas = calculation.cuotas || calculation.numeroCuotas || 12;
    tableData.push([
      `${numCuotas} Cuotas Mensuales`,
      `$${calculation.cuotaMensual.toLocaleString('en-US')} c/u`
    ]);
  }
  
  if (calculation.cuotasEspeciales > 0) {
    tableData.push([
      `${calculation.cuotasEspeciales} Cuotas Especiales`,
      'Según cronograma'
    ]);
  }
  
  if (calculation.valorResidual > 0) {
    tableData.push(['Valor Residual', `$${calculation.valorResidual.toLocaleString('en-US')}`]);
  }
  
  tableData.push(['', '']);
  tableData.push(['TOTAL A PAGAR', `$${calculation.totalAPagar.toLocaleString('en-US')}`]);
  
  // Dibujar tabla
  const startY = yPos;
  const cellHeight = 7;
  const col1Width = 120;
  const col2Width = 50;
  
  tableData.forEach((row, index) => {
    if (index === 0) {
      // Header
      doc.setFillColor(...belGreen);
      doc.rect(20, yPos, col1Width, cellHeight, 'F');
      doc.rect(20 + col1Width, yPos, col2Width, cellHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
    } else if (index === tableData.length - 1) {
      // Total
      doc.setFillColor(...belYellow);
      doc.rect(20, yPos, col1Width, cellHeight, 'F');
      doc.rect(20 + col1Width, yPos, col2Width, cellHeight, 'F');
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'bold');
    } else if (row[0] === '') {
      // Línea vacía
      yPos += cellHeight;
      return;
    } else {
      // Datos normales
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'normal');
    }
    
    doc.text(row[0], 25, yPos + 5);
    doc.text(row[1], 20 + col1Width + 5, yPos + 5);
    
    // Bordes
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, yPos, col1Width, cellHeight);
    doc.rect(20 + col1Width, yPos, col2Width, cellHeight);
    
    yPos += cellHeight;
  });
  
  yPos += 10;
  
  // Información del Asesor
  if (asesor) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.text('Tu Asesor Regional', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${asesor.nombre}`, 20, yPos);
    
    yPos += 7;
    doc.text(`Estado: ${asesor.estado}`, 20, yPos);
    
    yPos += 7;
    doc.text(`WhatsApp: ${asesor.telefono}`, 20, yPos);
    
    yPos += 7;
    doc.text(`Email: ${asesor.email}`, 20, yPos);
  }
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text('Tractores BEL Venezuela - www.tractoresbel.com', 105, pageHeight - 15, { align: 'center' });
  doc.text(`Generado el ${new Date().toLocaleDateString('es-VE')} a las ${new Date().toLocaleTimeString('es-VE')}`, 105, pageHeight - 10, { align: 'center' });
  doc.text('Este documento es una cotización referencial. Sujeto a disponibilidad y condiciones.', 105, pageHeight - 5, { align: 'center' });
  
  return doc;
};

export const downloadFinancingPDF = (tractor, plan, calculation, asesor) => {
  const doc = generateFinancingPDF(tractor, plan, calculation, asesor);
  const fileName = `Cotizacion_${tractor.modelo.replace(' ', '_')}_${plan.id}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};

export const generateWhatsAppMessage = (tractor, plan, calculation, asesor) => {
  let message = `🚜 *Cotización Tractores BEL*\n\n`;
  message += `*Tractor:* ${tractor.modelo} ${tractor.subtitulo ? '- ' + tractor.subtitulo : ''}\n`;
  message += `*Potencia:* ${tractor.potencia} HP\n`;
  message += `*Precio Base:* $${tractor.precio.toLocaleString('en-US')}\n\n`;
  
  message += `*Plan:* ${plan.nombre}\n`;
  message += `${plan.descripcion}\n\n`;
  
  message += `*Desglose:*\n`;
  
  if (calculation.inicial > 0) {
    message += `• Inicial: $${calculation.inicial.toLocaleString('en-US')}\n`;
  }
  
  if (calculation.iva > 0) {
    message += `• IVA (16%): $${calculation.iva.toLocaleString('en-US')}\n`;
  }
  
  if (calculation.igtf > 0) {
    message += `• IGTF (3%): $${calculation.igtf.toLocaleString('en-US')}\n`;
  }
  
  if (calculation.placa > 0) {
    message += `• Placa/Registro: $${calculation.placa.toLocaleString('en-US')}\n`;
  }
  
  if (calculation.cuotaMensual > 0) {
    const numCuotas = calculation.cuotas || calculation.numeroCuotas || 12;
    message += `• ${numCuotas} Cuotas: $${calculation.cuotaMensual.toLocaleString('en-US')} c/u\n`;
  }
  
  if (calculation.cuotasEspeciales > 0) {
    message += `• ${calculation.cuotasEspeciales} Cuotas Especiales\n`;
  }
  
  if (calculation.valorResidual > 0) {
    message += `• Valor Residual: $${calculation.valorResidual.toLocaleString('en-US')}\n`;
  }
  
  message += `\n*TOTAL A PAGAR: $${calculation.totalAPagar.toLocaleString('en-US')}*\n\n`;
  
  message += `Estoy interesado en este plan. ¿Podrías darme más información?\n\n`;
  message += `_Cotización generada desde tractoresbel.com_`;
  
  return encodeURIComponent(message);
};

export const shareViaWhatsApp = (tractor, plan, calculation, asesor) => {
  const message = generateWhatsAppMessage(tractor, plan, calculation, asesor);
  const whatsappUrl = `https://wa.me/${asesor.telefono.replace(/\D/g, '')}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};