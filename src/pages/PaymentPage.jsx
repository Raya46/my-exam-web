import React, { useEffect } from 'react';

const PaymentPage = ({ snaptoken }) => {
  useEffect(() => {
    const payButton = document.getElementById('pay-button');
    payButton.addEventListener('click', () => {
      if (snaptoken) {
        window.snap.embed('f634f1ba-bf69-441b-9cac-c69041ed40e5', {
          embedId: 'snap-container'
        });
      }
    });
  }, [snaptoken]);

  return (
    <div>
      <button id="pay-button">Bayar!</button>
      <div id="snap-container"></div>
    </div>
  );
};

export default PaymentPage;
