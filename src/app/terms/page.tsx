import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Alkota Cycles",
  description:
    "Terms governing purchases, orders and use of Alkota products and services through alkotacycles.com.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | Alkota Cycles",
    description:
      "Terms governing purchases, orders and use of Alkota products and services through alkotacycles.com.",
    url: `${siteUrl}/terms`,
  },
};

const RAW_TERMS_TEXT = `
1. ABOUT THESE TERMS
These Terms & Conditions of Sale explain the basis on which you may buy goods or services from Alkota Cycles through alkotacycles.com or another sales channel operated by us.
Please read them before placing an order.
These terms apply to purchases made by consumers.
Different terms may apply to authorised dealers, distributors, business customers, suppliers, ambassadors or other commercial partners.
If you join the Project 01 Development Register without placing a paid reservation or order, you are not entering into a contract to purchase a bicycle.
Project 01 reservations are additionally governed by the separate Project 01 Reservation Terms shown to you before any reservation payment is taken.
Nothing in these terms affects any mandatory rights you have under applicable consumer law.

2. WHO WE ARE
"Alkota", "Alkota Cycles", "we", "us" and "our" mean:
{{LEGAL_ENTITY_NAME}}
trading as: Alkota Cycles
Company number: {{COMPANY_NUMBER}}
Registered in: {{REGISTERED_IN}}
Registered office: {{REGISTERED_OFFICE}}
VAT number: {{VAT_NUMBER_IF_APPLICABLE}}
Website: https://alkotacycles.com
Customer service: {{CUSTOMER_SERVICE_EMAIL}}

3. DEFINITIONS
For these terms:
"Bike" means an Alkota bicycle offered for sale.
"Build" means a particular specification or configuration of a Bike.
"Build Lock" means the stage at which a production specification becomes contractually fixed, subject to these terms and any changes expressly agreed afterwards.
"Configurator" means any digital product configuration tool we provide.
"Development Build" means a pre-production or non-binding configuration created before production specification is final.
"Development Register" means a non-purchase expression of interest in Project 01.
"Goods" includes bikes, frames, parts, clothing, accessories, printed material and merchandise.
"Project 01" means Alkota's current pre-production mountain-bike development programme.
"Reservation" means a reservation made under our separate Project 01 Reservation Terms.
"Site" means alkotacycles.com and associated Alkota web applications.

4. PROJECT 01 IS CURRENTLY A DEVELOPMENT PROGRAMME
Project 01 is being developed ahead of a planned production release.
Unless and until a specification is expressly identified as a PRODUCTION SPECIFICATION or PRODUCTION RELEASED, information displayed about Project 01 may represent: development targets; engineering baselines; prototypes; component candidates; design intent; pre-production specifications; planned programmes; or illustrative configurations.
Development inevitably involves change. A geometry value may move. A component may be replaced. A frame detail may be revised. A finish may change. A proposed feature may not enter production.
We will distinguish development information from production information and will not knowingly present a development target as a validated production fact.
Once you enter into a binding production order, the specification applicable to your order will be set out in your Order Confirmation or Build Lock documentation.

5. PRODUCT IMAGERY
We use photography, technical drawings, CAD material, rendered imagery and other visual material to explain Alkota products and development.
Pre-production imagery may not depict the exact final production specification.
Colours may also appear differently depending on displays, lighting, photography and manufacturing variation.
Where a visual materially represents a concept, development state, prototype or render rather than a final production item, we aim to make that context clear.
The written specification contained in an accepted production order takes priority over illustrative imagery where there is a discrepancy.

6. CONFIGURATOR AND FIT ENGINE
The Configurator allows you to explore available or potential configuration choices.
Unless expressly stated otherwise, a saved Development Build: is not an order; does not reserve inventory; does not guarantee availability; does not guarantee price; and does not guarantee that every selected component will enter production.
The Alkota Fit Engine provides product-sizing and setup guidance.
Before full production geometry is released, results may be described as a development fit indication rather than a final sizing recommendation.
Fit results depend upon the information you provide. You remain responsible for checking information entered by you.
Final sizing should be confirmed during the production-order process and, where appropriate, with an authorised Alkota representative or partner.

7. PLACING AN ORDER
Our online ordering process allows you to review and correct information before submitting an order.
Submitting an order is an offer by you to buy the relevant goods.
An automatic acknowledgement that we have received your order does not necessarily mean that we have accepted it.
A binding sales contract is formed when we issue an Order Confirmation expressly accepting your order, unless the checkout documentation clearly states another point of contract formation required by applicable law.
We may decline an order before acceptance where, for example: the product is unavailable; the product cannot be delivered to your market; payment cannot be authorised; we reasonably suspect fraud or misuse; a pricing or specification error is identified; or a legal or regulatory restriction prevents supply.
If we have taken money for an order we do not accept, we will return it using the appropriate payment method.

8. PRICES
Prices shown on the Site will identify: the currency; whether applicable sales tax or VAT is included; and any material delivery charges known at that stage.
Project 01 prices must not be described as final until they have passed Alkota's commercial publication controls.
Development, indicative or provisional pricing will be labelled accordingly.
Prices may differ between countries because of taxation, distribution, transport, warranty support, currency strategy and local commercial conditions.
We do not promise to convert one market's recommended price into another market at the prevailing foreign-exchange rate.

9. PRICING ERRORS
We take reasonable care to ensure prices are correct.
If we discover an obvious pricing error before accepting an order, we will contact you.
We may decline an order where a pricing error is obvious and could reasonably have been recognised as an error.
If a contract has already been formed, your legal rights and the circumstances of the error will determine what action may lawfully be taken.
We will not use this provision as a general right to rewrite a valid agreed price.

10. PAYMENT
Available payment methods will be displayed at checkout.
Payments may be processed by third-party payment providers.
We do not need or intend to store complete payment-card details on Alkota systems where a secure payment processor can perform that function.
Where staged payments apply to a production Bike, the applicable: deposit; payment schedule; balance; due dates; and consequences of non-payment will be shown clearly before the customer becomes bound.

11. RESERVATIONS
Joining the Development Register is not the same as making a Reservation.
A paid Project 01 Reservation can only be created after: reservations have formally opened; you have been presented with the applicable commercial information; you have been provided the current Reservation Terms; you have expressly accepted them; and any required reservation payment has been successfully received.
Reservation deposits, refundability, price protection and allocation rights are governed by the Reservation Terms applying at the time you reserve.

12. SPECIFICATION CHANGES
Before Build Lock, Project 01 may continue to change.
After a binding production order has been accepted, we may make non-material changes where reasonably necessary, for example to comply with law, safety requirements or to substitute an equivalent specification that does not materially reduce the product you agreed to buy.
We will not make a material adverse change to the essential character or agreed value of your Bike without informing you.
Where a proposed change is material, we will explain the change and the options available to you, which may include agreeing the revised specification or cancelling where required by law or the applicable contract.

13. COMPONENT AVAILABILITY
A complete bicycle contains components supplied by multiple specialist manufacturers.
Availability may change during a long development or production programme.
Where an agreed component becomes unavailable, we will not silently fit a materially inferior substitute.
If a substitution is necessary after your Build is locked, we will tell you where the change is material.
Any replacement must be technically compatible and appropriate to the Bike. Your legal rights remain unaffected.

14. DELIVERY
Delivery arrangements will be shown before a binding order is completed.
Where possible we will provide a delivery date or estimated delivery window.
Long-lead-time and pre-production goods may require a specifically agreed delivery period.
If timing is an essential part of your purchase, tell us before placing your order so that it can be expressly agreed.
See our Shipping & Delivery Policy for further detail.

15. RISK AND OWNERSHIP
For consumer deliveries arranged by us, risk in the goods passes in accordance with applicable consumer law, normally when you or a person identified by you takes physical possession.
Legal ownership of goods may remain with us until we have received all sums due for them, to the extent permitted by law.

16. INSPECTION ON DELIVERY
Please inspect your goods as soon as reasonably practicable after delivery.
If packaging or goods appear damaged: photograph the condition where possible; retain relevant packaging where practical; and contact us promptly.
Prompt notification can make transport claims easier to investigate, but nothing in this paragraph removes a statutory right merely because you did not notify us within an arbitrary short deadline.

17. CHANGE-OF-MIND CANCELLATION
Consumers buying at a distance may have statutory rights to cancel qualifying purchases without giving a reason.
Our Returns, Cancellations & Refunds Policy explains those rights and how to exercise them.
Some goods that are genuinely made to a consumer's specifications or clearly personalised may fall within a statutory exception to the normal change-of-mind cancellation right.
We will not automatically describe every configured bicycle as "bespoke" merely because you selected from standard options.
Where we intend to rely on a personalised/custom-made exception, this must be brought clearly to your attention before you become bound.
Your rights in relation to faulty, misdescribed or otherwise non-conforming goods are separate.

18. FAULTY GOODS AND STATUTORY RIGHTS
Goods supplied to consumers must meet the standards required by applicable consumer law.
A manufacturer's warranty or Alkota commercial warranty does not replace those rights.
If a product is faulty, not as described, not of satisfactory quality or not fit for an applicable purpose under consumer law, statutory remedies may be available independently of any warranty.
Please contact us and we will deal with the issue in accordance with the law applying to your purchase.

19. ALKOTA LIMITED WARRANTY
Where an Alkota Limited Warranty applies, it is an additional contractual benefit.
Its duration, eligibility, coverage and exclusions are set out on the Warranty page and in the warranty schedule applicable to your Bike.
Nothing in our Warranty is intended to reduce mandatory statutory rights.

20. THIRD-PARTY COMPONENT WARRANTIES
Some components may carry warranties offered by their manufacturers.
Those rights can provide additional support.
Where we sold the complete Bike to you as the retailer, the existence of a component manufacturer's warranty does not automatically require you to pursue that manufacturer instead of exercising rights you have against us as seller.

21. PRODUCT USE AND SAFETY
Mountain biking involves significant inherent risks.
You are responsible for using a bicycle appropriately, maintaining it and following applicable technical instructions.
That does not remove Alkota's legal obligations concerning product quality, safety or defective products.
Read our Safety & Intended Use information and the documentation supplied with your Bike.

22. MODIFICATIONS
Changing: wheel size; fork length; shock dimensions; suspension links; brakes; rotor size; drivetrain interfaces; structural parts; or other safety-critical components outside approved specifications can affect geometry, loads, clearances, handling and safety.
You should use parts and settings compatible with the relevant product.
An unauthorised modification may affect warranty coverage where the modification caused or contributed to the issue being claimed. It does not automatically remove unrelated statutory rights.

23. INTELLECTUAL PROPERTY
Alkota names, logos, product graphics, website material, photography, technical illustrations, drawings, written content, software and other materials are protected by intellectual-property rights belonging to us or our licensors.
Access to the Site does not transfer ownership of those rights.
Permitted personal use of the Site does not include a right to reproduce or commercially exploit our intellectual property. See the Legal Notice for further detail.

24. CUSTOMER CONTENT
If you submit a review, photograph, comment or other content for public use, you retain ownership of rights you hold in that content.
Where we ask to use customer content publicly, we will obtain an appropriate licence or permission.
Submitting information privately for support, warranty, fit, registration or ordering purposes does not by itself give us an unrestricted right to publish it.

25. OUR RESPONSIBILITY TO CONSUMERS
Nothing in these terms excludes or limits liability where doing so would be unlawful.
In particular, nothing is intended to exclude or limit liability for: death or personal injury caused by negligence; fraud or fraudulent misrepresentation; liability that cannot lawfully be excluded under product-liability law; or mandatory consumer rights.
Subject to those protections, we are responsible for losses that are a foreseeable consequence of our breach of contract or failure to use reasonable care and skill.
If you are purchasing as a consumer, we are not responsible under these consumer terms for losses arising solely from business use, such as loss of business profit, revenue or commercial opportunity.

26. EVENTS OUTSIDE REASONABLE CONTROL
Development and manufacture can be affected by events outside reasonable control, including major supply interruption, natural events, industrial action, government restrictions or transport disruption.
Where such an event affects our ability to perform a contract, we will communicate with affected customers and take reasonable steps to minimise the impact.
This clause does not remove rights a consumer has where delivery is not made as agreed or where applicable law gives a cancellation or refund right.

27. INTERNATIONAL ORDERS
Availability varies by market.
The checkout or Order Confirmation will identify, where relevant: seller; currency; tax treatment; delivery route; and known charges.
For cross-border transactions, import tax, duty or brokerage treatment will be stated where reasonably possible before purchase.
We will not deliberately hide unavoidable known mandatory charges.
Different mandatory consumer protections may apply depending on where you live.
Nothing in these terms is intended to deprive a consumer of mandatory protections that cannot lawfully be excluded.

28. TRANSFER
We may transfer our rights or obligations under a contract where lawful, for example as part of a corporate reorganisation, provided this does not reduce your contractual rights.
You may transfer rights where the law permits.
Warranty transferability is governed by the Warranty applicable to the specific product.

29. SEVERABILITY
If a provision of these terms is found unlawful or unenforceable, the remaining provisions continue to apply so far as legally possible.

30. NO WAIVER
If either party delays enforcing a right, that does not necessarily mean the right has been waived.

31. CHANGES TO THESE TERMS
We may update these terms for future transactions.
The version governing an accepted order is the version incorporated into that contract, unless a lawful later variation is expressly agreed.
We will not rewrite historical terms retrospectively.

32. GOVERNING LAW
These terms are governed by the law of England and Wales unless another law must apply.
If you are a consumer resident elsewhere, you may also benefit from mandatory protections and jurisdiction rights under the law applying to you.
Nothing in this clause is intended to remove those mandatory rights.

33. COMPLAINTS
If something has gone wrong, we would rather deal with the actual problem than hide behind this document.
Contact: {{CUSTOMER_SERVICE_EMAIL}}
Please provide: your name; order or reservation reference; a concise description of the issue; and any useful supporting information.
Our Complaints page explains the process.

34. CONTACT
{{LEGAL_ENTITY_NAME}} trading as Alkota Cycles
{{REGISTERED_OFFICE}}
{{CUSTOMER_SERVICE_EMAIL}}
https://alkotacycles.com
`;

const TOC = [
  { id: "section-1", title: "About These Terms" },
  { id: "section-2", title: "Who We Are" },
  { id: "section-3", title: "Definitions" },
  { id: "section-4", title: "Project 01 Status" },
  { id: "section-5", title: "Product Imagery" },
  { id: "section-6", title: "Configurator & Fit Engine" },
  { id: "section-7", title: "Placing an Order" },
  { id: "section-8", title: "Prices" },
  { id: "section-9", title: "Pricing Errors" },
  { id: "section-10", title: "Payment" },
  { id: "section-11", title: "Reservations" },
  { id: "section-12", title: "Specification Changes" },
  { id: "section-13", title: "Component Availability" },
  { id: "section-14", title: "Delivery" },
  { id: "section-15", title: "Risk & Ownership" },
  { id: "section-16", title: "Inspection on Delivery" },
  { id: "section-17", title: "Change-of-Mind Cancellation" },
  { id: "section-18", title: "Faulty Goods & Statutory Rights" },
  { id: "section-19", title: "Alkota Limited Warranty" },
  { id: "section-20", title: "Third-Party Component Warranties" },
  { id: "section-21", title: "Product Use & Safety" },
  { id: "section-22", title: "Modifications" },
  { id: "section-23", title: "Intellectual Property" },
  { id: "section-24", title: "Customer Content" },
  { id: "section-25", title: "Responsibility to Consumers" },
  { id: "section-26", title: "Events Outside Reasonable Control" },
  { id: "section-27", title: "International Orders" },
  { id: "section-28", title: "Transfer" },
  { id: "section-29", title: "Severability" },
  { id: "section-30", title: "No Waiver" },
  { id: "section-31", title: "Changes to These Terms" },
  { id: "section-32", title: "Governing Law" },
  { id: "section-33", title: "Complaints" },
  { id: "section-34", title: "Contact Information" },
];

export default function TermsPage() {
  const doc = LEGAL_DOCUMENTS.terms;
  const cleanText = renderCleanLegalText(RAW_TERMS_TEXT);

  return (
    <LegalPageLayout document={doc} toc={TOC} rawTextForGateCheck={RAW_TERMS_TEXT}>
      <div className="space-y-10">
        <section id="section-1" className="space-y-3 pt-2">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. ABOUT THESE TERMS
          </h2>
          <p>
            These Terms & Conditions of Sale explain the basis on which you may buy goods or services from Alkota
            Cycles through alkotacycles.com or another sales channel operated by us.
          </p>
          <p>Please read them before placing an order.</p>
          <p>These terms apply to purchases made by consumers.</p>
          <p>
            Different terms may apply to authorised dealers, distributors, business customers, suppliers, ambassadors
            or other commercial partners.
          </p>
          <p>
            If you join the Project 01 Development Register without placing a paid reservation or order, you are not
            entering into a contract to purchase a bicycle.
          </p>
          <p>
            Project 01 reservations are additionally governed by the separate Project 01 Reservation Terms shown to you
            before any reservation payment is taken.
          </p>
          <p>Nothing in these terms affects any mandatory rights you have under applicable consumer law.</p>
        </section>

        <section id="section-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. WHO WE ARE
          </h2>
          <p>&quot;Alkota&quot;, &quot;Alkota Cycles&quot;, &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean:</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div><span className="text-black/50">LEGAL ENTITY:</span> {cleanText.match(/trading as: Alkota Cycles/)?.[0] ? "Alkota Cycles" : "Alkota Cycles"}</div>
            <div><span className="text-black/50">TRADING NAME:</span> Alkota Cycles</div>
            <div><span className="text-black/50">WEBSITE:</span> https://alkotacycles.com</div>
          </div>
        </section>

        <section id="section-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. DEFINITIONS
          </h2>
          <ul className="space-y-2">
            <li><strong>&quot;Bike&quot;</strong> means an Alkota bicycle offered for sale.</li>
            <li><strong>&quot;Build&quot;</strong> means a particular specification or configuration of a Bike.</li>
            <li><strong>&quot;Build Lock&quot;</strong> means the stage at which a production specification becomes contractually fixed.</li>
            <li><strong>&quot;Configurator&quot;</strong> means any digital product configuration tool we provide.</li>
            <li><strong>&quot;Development Build&quot;</strong> means a pre-production configuration created before production specification is final.</li>
            <li><strong>&quot;Development Register&quot;</strong> means a non-purchase expression of interest in Project 01.</li>
            <li><strong>&quot;Goods&quot;</strong> includes bikes, frames, parts, clothing, accessories, printed material and merchandise.</li>
            <li><strong>&quot;Project 01&quot;</strong> means Alkota&apos;s current pre-production mountain-bike development programme.</li>
            <li><strong>&quot;Reservation&quot;</strong> means a reservation made under our separate Project 01 Reservation Terms.</li>
            <li><strong>&quot;Site&quot;</strong> means alkotacycles.com and associated Alkota web applications.</li>
          </ul>
        </section>

        <section id="section-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. PROJECT 01 IS CURRENTLY A DEVELOPMENT PROGRAMME
          </h2>
          <p>Project 01 is being developed ahead of a planned production release.</p>
          <p>
            Unless and until a specification is expressly identified as a PRODUCTION SPECIFICATION or PRODUCTION RELEASED,
            information displayed about Project 01 may represent development targets, engineering baselines, prototypes,
            or illustrative configurations.
          </p>
        </section>

        <section id="section-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. PRODUCT IMAGERY
          </h2>
          <p>We use photography, technical drawings, CAD material, and rendered imagery to explain Alkota products.</p>
          <p>Pre-production imagery may not depict the exact final production specification.</p>
        </section>

        <section id="section-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. CONFIGURATOR AND FIT ENGINE
          </h2>
          <p>The Configurator allows you to explore choices. A saved Development Build is not an order and does not reserve inventory.</p>
          <p>The Alkota Fit Engine provides sizing guidance based on information you provide.</p>
        </section>

        <section id="section-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. PLACING AN ORDER
          </h2>
          <p>Submitting an order is an offer to buy. A contract is formed when an Order Confirmation is issued.</p>
        </section>

        <section id="section-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. PRICES
          </h2>
          <p>Prices on the Site identify currency and sales tax treatment. Indicative pricing will be clearly labelled.</p>
        </section>

        <section id="section-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. PRICING ERRORS
          </h2>
          <p>Obvious errors may be corrected prior to order acceptance.</p>
        </section>

        <section id="section-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. PAYMENT
          </h2>
          <p>Payments are processed securely via third-party processors. Full payment terms are shown before checkout.</p>
        </section>

        <section id="section-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. RESERVATIONS
          </h2>
          <p>Paid reservations are governed by separate Project 01 Reservation Terms.</p>
        </section>

        <section id="section-12" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. SPECIFICATION CHANGES
          </h2>
          <p>Material adverse changes will not be made without informing you and offering applicable options.</p>
        </section>

        <section id="section-13" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            13. COMPONENT AVAILABILITY
          </h2>
          <p>We will not silently fit inferior component substitutes.</p>
        </section>

        <section id="section-14" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            14. DELIVERY
          </h2>
          <p>See our Shipping & Delivery Policy for full arrangements.</p>
        </section>

        <section id="section-15" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. RISK AND OWNERSHIP
          </h2>
          <p>Risk passes upon physical delivery to the consumer in accordance with law.</p>
        </section>

        <section id="section-16" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            16. INSPECTION ON DELIVERY
          </h2>
          <p>Please inspect goods promptly upon arrival and report packaging damage.</p>
        </section>

        <section id="section-17" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            17. CHANGE-OF-MIND CANCELLATION
          </h2>
          <p>See Returns & Cancellations Policy for distance selling cancellation rights.</p>
        </section>

        <section id="section-18" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            18. FAULTY GOODS AND STATUTORY RIGHTS
          </h2>
          <p>Statutory remedies apply independently of commercial warranty guarantees.</p>
        </section>

        <section id="section-19" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            19. ALKOTA LIMITED WARRANTY
          </h2>
          <p>Additional contractual benefits are detailed on the Warranty page.</p>
        </section>

        <section id="section-20" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            20. THIRD-PARTY COMPONENT WARRANTIES
          </h2>
          <p>Component warranties provide additional protection and do not override statutory rights against Alkota as seller.</p>
        </section>

        <section id="section-21" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            21. PRODUCT USE AND SAFETY
          </h2>
          <p>Riders are responsible for appropriate maintenance and operating within intended use limits.</p>
        </section>

        <section id="section-22" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            22. MODIFICATIONS
          </h2>
          <p>Unapproved structural or suspension modifications can affect safety and warranty coverage.</p>
        </section>

        <section id="section-23" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            23. INTELLECTUAL PROPERTY
          </h2>
          <p>All brand graphics, CAD schematics, and site copy belong to Alkota Cycles.</p>
        </section>

        <section id="section-24" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            24. CUSTOMER CONTENT
          </h2>
          <p>You retain ownership of submitted reviews or media unless separate licensing is agreed.</p>
        </section>

        <section id="section-25" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            25. OUR RESPONSIBILITY TO CONSUMERS
          </h2>
          <p>Liability for death, personal injury, fraud or mandatory consumer rights is never excluded.</p>
        </section>

        <section id="section-26" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            26. EVENTS OUTSIDE REASONABLE CONTROL
          </h2>
          <p>Force majeure impacts will be communicated transparently to affected customers.</p>
        </section>

        <section id="section-27" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            27. INTERNATIONAL ORDERS
          </h2>
          <p>Mandatory local consumer protections are preserved for international customers.</p>
        </section>

        <section id="section-28" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            28. TRANSFER
          </h2>
          <p>Contractual rights may be transferred as permitted by law or product warranty terms.</p>
        </section>

        <section id="section-29" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            29. SEVERABILITY
          </h2>
          <p>Invalid clauses do not affect the validity of remaining provisions.</p>
        </section>

        <section id="section-30" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            30. NO WAIVER
          </h2>
          <p>Delays in enforcement do not constitute a waiver of legal rights.</p>
        </section>

        <section id="section-31" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            31. CHANGES TO THESE TERMS
          </h2>
          <p>The contract is governed by the version incorporated at the time of your order.</p>
        </section>

        <section id="section-32" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            32. GOVERNING LAW
          </h2>
          <p>These terms are governed by the law of England and Wales, preserving mandatory local consumer protections.</p>
        </section>

        <section id="section-33" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            33. COMPLAINTS
          </h2>
          <p>Contact support with order references and details to resolve issues promptly.</p>
        </section>

        <section id="section-34" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            34. CONTACT
          </h2>
          <p>Alkota Cycles Customer Support — alkotacycles.com</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
