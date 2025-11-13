import jsPDF from 'jspdf';
import { Order } from '@/contexts/OrderContext';

export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246); // Primary blue
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
  // Company Info
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Your Shop', 20, 35);
  doc.text('www.yourshop.com', 20, 40);
  doc.text('support@yourshop.com', 20, 45);
  
  // Order Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text(`Order ID: ${order.id}`, 20, 60);
  doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 66);
  doc.text(`Payment Method: ${order.paymentMethod}`, 20, 72);
  doc.text(`Status: ${order.paymentStatus.toUpperCase()}`, 20, 78);
  
  // Customer Info
  if (order.customerInfo) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, 90);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(order.customerInfo.name, 20, 96);
    doc.text(order.customerInfo.email, 20, 101);
    doc.text(order.customerInfo.phone, 20, 106);
    if (order.customerInfo.address) {
      doc.text(order.customerInfo.address, 20, 111);
    }
  }
  
  // Items Table Header
  const tableTop = 130;
  doc.setFillColor(59, 130, 246);
  doc.rect(20, tableTop, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Item', 25, tableTop + 5);
  doc.text('Qty', 120, tableTop + 5);
  doc.text('Price', 145, tableTop + 5);
  doc.text('Total', 170, tableTop + 5);
  
  // Items
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'normal');
  let yPos = tableTop + 15;
  
  order.items.forEach((item, index) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(item.name, 25, yPos);
    doc.text(item.quantity.toString(), 125, yPos);
    doc.text(`$${item.price.toFixed(2)}`, 145, yPos);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, yPos);
    yPos += 8;
  });
  
  // Total
  yPos += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', 140, yPos);
  doc.setTextColor(59, 130, 246);
  doc.text(`$${order.total.toFixed(2)}`, 170, yPos);
  
  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('Thank you for your business!', 105, 280, { align: 'center' });
  
  // Save PDF
  doc.save(`Invoice-${order.id}.pdf`);
};
