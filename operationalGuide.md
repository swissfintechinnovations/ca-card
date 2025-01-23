# Operational Guide

- Scope of the Card API | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Scope-of-the-Card-API)
- Central Design Decisions | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Central-Design-Decisions)
- Card API Level 1 | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Card-API-Level-1)
- Card API Level 2 | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Card-API-Level-2)
- Card API Level 3 | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Card-API-Level-3)
- Use of this spec | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Use-of-this-spec)
- Appendix | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Appendix)

# Scope of the Card API

## Card types covered with the Card API
In scope:
* Debit
* Credit
* Prepaid

Ouf of scope:
* Deposit cards or non-Scheme-based cards (e.g.loyalty cards) 

The focus for creating the Card API specification was on the Mastercard and Visa schemes. However, the standard is open to other schemes as well and feedback that gives hints on necessary adaptations will be implemented.

## Transaction types covered with the Card API
* All transactions authorized or settled via a payment card (given that the card type is in scope of this API)
* Card account-based transactions (e.g. fees, deposits, bill payments) are only available from Level 2 upwards. 
* Only financial transactions are covered (i.e., no PIN changes, balance inquiries, or status checks).

Matching transactions retrieved via Card API with debit card transactions which are accessible on the bank account via the XS2A API is not actively supported. 
The Card API only provides card transactions and from Level 2 upwards on the card account as well. Please note that this card account is not equivalent to the bank account.

## Provider and User of the API
* Provider: All organizations which are able to implement API endpoints which meet the requirements of the Common API Card API specifications (e.g. provide mandatory fields) can act as provider. It is expected that most often Card Service Providers will act at least as technical providers of the Card API.
* User: The Card API primarily targets Open Finance Use Cases described within each of the foreseen levels (i.e. level 1 to 3). The Card API is suitable for direct integration between Card Service Providers and third parties needing card data to enable new services or further develop existing use cases.

Using the Card API for integrating Card Service Providers with distribution partners or issuers is not the main focus, as more detailed information and further enhanced use cases are usually required. 

The contractual and technical requirements for exchanging card data and the allowed uses can be freely agreed upon between Provider and User. The standard does not set any specific rule in this regard. 


# Central Design Decisions

## Level concept
The specification of the Card API is structured in different maturity levels, i.e. from an API modelling point of view, a Matryoshka approach is chosen here. This ensures that different users of the API with different availabilities of information still follow as similar an approach as possible. It also enables a more precise definition of the data model for data providers who do not want to offer all entities. Parties negotiate among themselves which level of the API should be used; ideally, level 3, the most comprehensive level of the API, is aimed for, as this ensures maximum compatibility.

The levels build on each other. This means that level 1 supports the least functionality, but also requires the least information for use. Level 3 offers broader functionality with additional endpoints, but must also be used with complete data on the person/card/account. As the levels build on each other, it is also possible to communicate to lower levels via a proxy that filters the corresponding fields. For example, a data provider can have implemented level 3, but the proxy or end user can only map level 1 information and still receive corresponding responses for level 1.

Please note that the three-tiered approach does not reflect the three card types, but different use cases as described below.

![API Structure](https://github.com/swissfintechinnovations/ca-card/assets/116151702/f93b82c3-eba7-42db-9aac-f7e34037f936)

## Name patterns for parameters

### Differentiation between *code / *reference / *id
The parameter names allow an easy recognition of the type of underlying identifier. The three following words are used as part of the parameter names for distinction:

* *Id: technical identifier for an instance of a resource, is always in the uuid format; is used for direct access to a resource instance in an API endpoint
* *Reference: functional identifier for an instance of a resource that can also be known by an end customer, is a generic string without a standardized format 
* *Code: identifier for an instance of a resource, can be mapped to a name in a finite set of values, is a generic string without a standardized format


# Card API Level 1

## Model
![Card-API_Level1](https://github.com/swissfintechinnovations/ca-card/assets/141315380/7ec14f1a-7fa8-4cdb-bca2-8f806f0e843c)

### “cards” resource
The term “cards” refers to both physical and virtual credit or debit cards issued by banks or financial institutions. Physical cards are the traditional plastic cards that holders carry with them. Virtual cards, on the other hand, only exist in digital form and are often used for online payments. These virtual cards have a card number, expiration date and security code like physical cards.
### “card-tokens” resource
The term “card tokens” refers to the DPAN (Digital Primary Account Number) of a credit or debit card that is stored in digital wallets, wearables or with merchants (e.g. for click-to-pay). The “card token” serves as a replacement for the PAN and is used for transactions instead of the real card number. This reduces the risk of data misuse or fraud, as the sensitive card data is not transmitted directly.
### “transactions” resource
The term “transactions” refers to payments made with physical or virtual cards or with card tokens. These transactions are displayed on the cardholder's account and include all authorized and recorded payments entered by the cardholder.

Transactions can include various types of payments, such as retail purchases, online payments, transfers between accounts, etc. Each transaction is authorized and recorded, which means that it has been approved by the cardholder and the payment amount has been debited from the cardholder's account.

## Use Cases
| Identifier | Description |
| -------- | ------- |
| PFM/BFM | Aggregation of transactions for cards from different issuers to make evaluations on spending behavior, budget, ecological footprint or more.<br>Limitation: Account-based transactions are not taken into account.<br>Challenge with these endpoints: incomplete view of card account transactions. |
| Card overview| Aggregation of cards and associated tokens from different issuers for display.<br>Restriction: Structure of cards in an account or customer relationship is not easily traceable. |

## Remarks
none so far


# Card API Level 2

## Model
![Card-API_Level12png](https://github.com/swissfintechinnovations/ca-card/assets/141315380/649d1704-f7ae-4821-bb69-abb9450e99a4)

## Use Cases
| Identifier | Description |
| -------- | ------- |
| PFM/BFM | Everything from level 1, plus consideration of account-based transactions. |
| Card overview | Everything from level 1, plus more extensive information on card account data. |
| Expense Management | At least for smaller companies / simpler company structures, level 2 should be sufficient to enable this use case. |

## Remarks
none so far


# Card API Level 3

## Model
![Card-API_Level3](https://github.com/swissfintechinnovations/ca-card/assets/141315380/8f247ec2-2726-4fb1-8441-ff417af68d8b)

## Use Cases
| Identifier | Description |
| -------- | ------- |
| &nbsp; | All Level 1 + 2 use cases, plus more structuring options, i.e. end customers can map internal structures (organizational units) and contracts, for example. |

## Remarks
none so far


# Use of this spec

## Basics
For direct communication via the Card API, both parties must negotiate the level of the API used and agree on a level. 

## Direct communication
If only GET requests are used, it is possible that the sender supports a higher level of the API.  In this case, the recipient must ignore additional information in the response.

## Communication via proxy
In practice, communication is often redirected via third parties, so-called proxies. An example of such an implementation would be the bLink platform of SIX. A proxy supports all levels of the API and leaves the selection of the level to the communicating entities. The selection of the level determines the information content of the delivered data.
In this scenario, it is also possible to communicate via different levels:

* Data provider supports higher level  
    In this case, the proxy filters all undefined fields of the level and the TPP receives all data as defined in its level.
* Data provider supports lower level  
    In this case, the proxy fills in the missing fields with dummy data. In this way, the TPP receives a data structure with the expected fields. Caution: This response still only contains the information content of the level supported by the data provider.

![API-Implementation](https://github.com/swissfintechinnovations/ca-card/assets/141315380/3fd7c261-ace3-4ac8-8f96-8b2cbc589329)


# Appendix

## Basic understanding of the card business
This chapter contains a brief description of the most important roles for scheme-based payment cards. More detailed information can be found, for example, in the following source: [https://www.swiss-payment-association.ch/kreditkarten/kreditkartensystem](https://www.swiss-payment-association.ch/kreditkarten/kreditkartensystem)

### Role model for issuing cards
<img src="https://github.com/swissfintechinnovations/ca-card/assets/141315380/7b411dc0-4c93-4007-a3b7-494728d5a7d1" alt="Rollenverständnis im Kartengeschäft" width="auto" height="300">

Depending on the provider, some roles might be covered by the same organization.

### Cardholder
* Uses the payment card as payment instrument.
* Has a contractual relationship with the issuer.

### Distribution Partner
* Is selling cards legally offered by issuers to cardholders by using his own brand.
* Does not directly own the data about payment cards and transactions. But access to these data can be possible based on the contractual setup between issuer and cardholder without an explicit consent of the cardholder.
* Can take over some duties and obligations for the card issuing, depending on the contract with the card issuer.

### Card Issuer
* Bank or other organization which is legally issuing a payment card under a certain payment scheme (e.g. Mastercard, Visa, American Express, others) to cardholders. 
* Is responsible that payment cards and the issuer-side processing follow the rules of the payment scheme.
* Manages the payment cards of cardholders, authorizes transactions, and guarantees towards the scheme and acquirer the payment of valid authorizations.
* Is directly the owner of data about payment cards and transactions.
* Card issuers in Switzerland are for example banks, Cembra, Swisscard, Viseca Card Services.

### Card Service Provider
* Is operating the card and transaction processing on behalf of the card issuer. 
* Has a contract with the card issuer. 
* Can cover many parts of scheme and legal regulations as service for the card issuer. 
* Card service providers in Switzerland are for example UBS Card Center, SIX, Viseca Payment Services.

### Processor
* Provides services for the card service provider related to the card management and transaction processing. 
* Has a contract with the card service provider. 

### Embosser
* Is producing the physical card upon request of the card issuer.
* Has a contract with the card issuer.
