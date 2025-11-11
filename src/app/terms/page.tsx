export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold">Rental Terms and Conditions – GlamRent</h1>
      
      <p className="mt-6 text-slate-600 dark:text-slate-400">
        Welcome to GlamRent. Before using our garment rental service, we ask that you carefully read the following terms and conditions. By using our platform, you agree to comply with these rules.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">1. Purpose of Service</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            GlamRent offers rental services for dresses, shoes, and accessories for special occasions, under the terms set forth in this document.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Rental Requirements</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>The user must be over 18 years of age.</li>
            <li>The user must have a registered account on our website to make reservations.</li>
            <li>Payment must be completed before delivery of the product.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Reservations and Cancellations</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>Reservations must be made at least 3 days in advance.</li>
            <li>Reservation cancellations are allowed up to 24 hours before the rental date, with full or partial refund according to the current policy.</li>
            <li>Cancellations outside this timeframe may be subject to charges.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Delivery and Return</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>Delivery will be made to the address indicated by the user within the service coverage area.</li>
            <li>The return must be made within the agreed timeframe and in the original conditions.</li>
            <li>In case of delay in return, an additional charge of $10 per day of delay will apply.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Responsible Use of Garments</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>The user agrees to use the garments responsibly and in accordance with their nature.</li>
            <li>Altering, sewing, cutting, or damaging the garments is not permitted.</li>
            <li>Any damage or loss will be evaluated and may result in an additional charge to the user.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Garment Cleaning</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>Garments must be returned in the conditions in which they were delivered.</li>
            <li>Professional cleaning is included in the service, but improper use that generates permanent stains may result in an additional charge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Refund Policy</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>No returns or refunds are accepted for reasons other than manufacturing defects or failure to deliver by GlamRent.</li>
            <li>Any claim must be made within 24 hours after delivery of the garment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Liability</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>GlamRent is not responsible for accidents, injuries, or inconveniences that may occur during the use of rented garments.</li>
            <li>The user assumes all responsibility for the use of the garments during the rental period.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Data Protection</h2>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>The user&apos;s personal data will be used exclusively for rental management and service improvement.</li>
            <li>We will not share personal information with third parties without consent, except for legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Modifications to the Terms</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            GlamRent reserves the right to modify these terms at any time, notifying registered users via email or through a notice on the website.
          </p>
        </section>
      </div>
    </div>
  );
}

