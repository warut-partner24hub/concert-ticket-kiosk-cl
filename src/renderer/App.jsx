import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Ticket } from 'lucide-react';

const concerts = [
  { id: 1, name: "BTS World Tour", date: "2024-12-25", price: 5000, available: 100 },
  { id: 2, name: "Blackpink in Bangkok", date: "2024-12-30", price: 4500, available: 150 },
];

const App = () => {
  const [step, setStep] = useState('select-concert');
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cardNumber, setCardNumber] = useState('');

  const handleConcertSelect = (concert) => {
    setSelectedConcert(concert);
    setStep('select-quantity');
  };

  const handlePayment = () => {
    // In real app, integrate with payment gateway
    console.log('Processing payment...');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const resetBooking = () => {
    setStep('select-concert');
    setSelectedConcert(null);
    setQuantity(1);
    setCardNumber('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          {step !== 'select-concert' && (
            <button onClick={resetBooking} className="mr-4">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-2xl font-bold">ระบบจองบัตรคอนเสิร์ต</h1>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {step === 'select-concert' && (
          <div className="grid gap-4 md:grid-cols-2">
            {concerts.map((concert) => (
              <div 
                key={concert.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => handleConcertSelect(concert)}
              >
                <Ticket className="w-12 h-12 text-blue-600 mb-4" />
                <h2 className="text-xl font-bold mb-2">{concert.name}</h2>
                <p className="text-gray-600">วันที่: {concert.date}</p>
                <p className="text-gray-600">ราคา: {concert.price} บาท</p>
                <p className="text-gray-600">ที่นั่งว่าง: {concert.available}</p>
              </div>
            ))}
          </div>
        )}

        {step === 'select-quantity' && selectedConcert && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">เลือกจำนวนบัตร</h2>
            <p className="mb-4">คอนเสิร์ต: {selectedConcert.name}</p>
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(4, quantity + 1))}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <p className="text-xl mb-4">รวม: {selectedConcert.price * quantity} บาท</p>
            <button 
              onClick={() => setStep('payment')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              ดำเนินการต่อ
            </button>
          </div>
        )}

        {step === 'payment' && selectedConcert && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">ชำระเงิน</h2>
            <div className="mb-4">
              <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
              <label className="block text-gray-700 mb-2">หมายเลขบัตรเครดิต</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>
            <button 
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              ชำระเงิน {selectedConcert.price * quantity} บาท
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">จองบัตรสำเร็จ!</h2>
            <p className="mb-4">กรุณารับบัตรของท่านที่เครื่องพิมพ์</p>
            <button 
              onClick={resetBooking}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
            >
              จองบัตรใหม่
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;