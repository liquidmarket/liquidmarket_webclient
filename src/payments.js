const methodData = [
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard"],
        supportedTypes: ["debit", "credit"],
      },
    }
  ];

function makeModifiers(amount) {
      // Credit card incurs a $3.00 processing fee.
    const creditCardFee = {
        label: "Credit card processing fee",
        amount: { currency: "USD", value: "3.00" },
    };
    const modifiers = [
    {
      additionalDisplayItems: [creditCardFee],
      supportedMethods: "basic-card",
      total: {
        label: "Total due",
        amount: { currency: "USD", value: amount + 3 },
      },
      data: {
        supportedTypes: "credit",
      },
    },
  ];
  return modifiers;
}

function makeDeposit(deposit_amount) {
    const modifiers = makeModifiers(deposit_amount);
    let details = {
        id: "super-store-order-123-12312",
        displayItems: [
          {
            label: 'deposit',
            amount: { currency: "USD", value: deposit_amount },
          }
        ],
        total: {
          label: "Total due",
          // The total is USD$65.00 here because we need to
          // add shipping (below). The selected shipping
          // costs USD$5.00.  
          amount: { currency: "USD", value: deposit_amount },
        },
      };
    Object.assign(details, { modifiers });
    return details;
}

function makePurchace(deposit_amount, short_description) {
    const modifiers = makeModifiers(deposit_amount);
    let details = {
        id: "super-store-order-123-12312",
        displayItems: [
          {
            label: short_description,
            amount: { currency: "USD", value: deposit_amount },
          }
        ],
        total: {
          label: "Total due",
          // The total is USD$65.00 here because we need to
          // add shipping (below). The selected shipping
          // costs USD$5.00.  
          amount: { currency: "USD", value: deposit_amount },
        },
      };
    Object.assign(details, { modifiers });
    return details;
}

  const options = {
    requestPayerEmail: false,
    requestPayerName: true,
    requestPayerPhone: true,
    requestShipping: false,
  }

  export async function depositPaymentRequest(amount) {
    try {
      const request = new window.PaymentRequest(methodData, makeDeposit(amount), options);
      const response = await request.show();
      await validateResponse(response);
    } catch (err) {
      // AbortError, SecurityError
      console.error(err);
    }
  }
  export async function canMakePaymentRequest(amount) {
    if (window.PaymentRequest) {
      try {
        const request = new window.PaymentRequest(methodData, makeDeposit(amount), options);
        return await request.canMakePayment();
      } catch (err) {
        // AbortError, SecurityError
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }
  export async function purchacePaymentRequest(amount, short_description) {
    try {
      const request = new window.PaymentRequest(methodData, makePurchace(amount, short_description), options);
      const response = await request.show();
      await validateResponse(response);
    } catch (err) {
      // AbortError, SecurityError
      console.error(err);
    }
  }

  async function validateResponse(response) {
      console.log(response);
    response.complete("success");
  }