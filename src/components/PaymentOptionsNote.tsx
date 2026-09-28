/**
 * The only payment wording Adrian has confirmed (Vryan email, 27 Sep 2026).
 * Don't add plan, instalment or deposit detail around it.
 */
const PaymentOptionsNote = () => (
  <>
    Payment options: talk to us on{" "}
    <a href="tel:0411626398" className="font-semibold text-blue-600 hover:underline whitespace-nowrap">
      0411 626 398
    </a>
  </>
);

export default PaymentOptionsNote;
