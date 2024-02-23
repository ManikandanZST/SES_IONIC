import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor() {}

  identifyCardBrand(cardNumber: string): string {
    // Define regular expressions for each card brand
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      amex: /^3[47][0-9]{13}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      rupay: /^(508[5-9][0-9][0-9]|60698[5-9]|60699[0-9]|607[0-8][0-9][0-9]|6079[0-7][0-9]|60798[0-4]|608[0-4][0-9][0-9]|60850[0-7]|6521[5-9][0-9]|652[2-7][0-9][0-9]|6528[0-9][0-9]|6529[0-1][0-9]|65292[0-5])\d{10}$/,
      maestro: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
      unionPay: /^(62[0-9]{14,17})$/,
    };

    // Iterate through the card patterns and find a match
    for (const brand in cardPatterns) {
      if (cardPatterns[brand].test(cardNumber)) {
        return brand;
      }
    }

    // If no match is found, return 'Unknown' or handle as needed
    return 'Unknown';
  }
}
