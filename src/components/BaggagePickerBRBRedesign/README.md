# BaggagePickerBRBRedesign

- renders baggage picker, forked from [BaggagePicker](#baggagepicker) to allow different offering of Blue Ribbon Bags protection.

**Example:**

```js
<BaggagePickerBRBRedesign
  airlines={airlines}
  baggage={baggageData}
  context="context"
  changeBagCombination={(type, index) => {}}
  passengerBaggage={{
    handBag: 1,
    holdBag: 1
  }}
  passengerCategory="adult"
  prioBoardingLinkHandler={airlines => console.log("prioAirlines", airlines)}
  pickerType="handBag"
  shouldShowRecheckNote={false}
  shouldShowAddBlueRibbonBag={true}
  blueRibbonBagPrice={{amount: 4.99}}
  isBlueRibbonBagAdded={isAdded}
  addBlueRibbonBag={add}
  removeBlueRibbonBag={remove}
  openBlueribbonBagsSmartFAQ={() => {console.log("opening SmartFAQ article")}}
/>
```
