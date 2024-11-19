package com.example.demo.dto.request.paymentRequest;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BuyNowPaymentRequest {
    float total;
    int productId;
    int quantity;
}
