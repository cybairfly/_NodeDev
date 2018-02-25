const axios = require('axios');

// var fromCurrency = 'CZK';
// var intoCurrency = 'EUR';
// var amount = 10;

const urlRates = `https://api.fixer.io/latest?from=`;
const urlCountries = `https://restcountries.eu/rest/v2/currency/`;

const getRateAsync =  async (from, into) => {
  try {
    const response = await axios.get(urlRates + from);// RETURNS PROMISE
    const rate = response.data.rates[into];// more error handling for this case

    if(rate) {// return rate ? rate : new Error(); should work alright as well?
      return rate;
    }
    else {
      throw new Error();// TRIGGER CUSTOM ERROR MESSAGE BELOW USING GENERIC ONE
    }
  }
  catch (e) {
    throw new Error(`Cannot obtain exchange rate for pair ${from}/${into}`);
  }
};

const getCountriesAsync = async (currency) => {
  try {
    const response = await axios.get(urlCountries + currency);// RETURNS PROMISE
    return response.data.map((country) => country.name);
  }
  catch (e) {
    throw new Error(`Cannot obtain list of countries using ${currency}`);
  }
};

const convertAsync = async (from, into, amount) => {
  from = from.toUpperCase();
  into = into.toUpperCase();

  const rate = await getRateAsync(from, into, amount);
  const countries = await getCountriesAsync(into);

  let converted = `${from} ${amount} = ${(amount * rate).toFixed(2)} ${into}`;
  let exchanged = `${from}/${into} rate: ${rate.toFixed(2)}`;
  // let countries = `Can be spent in: ${list.join(', ')}`;

  return {
    converted,
    exchanged,
    countries
  }
};

convertAsync('eur', 'dkk', 100)
.then((result) => {
  console.log(result.converted);
  console.log(result.exchanged);
  console.log('Can be used in:');
  for(country of result.countries) {//result.countries.forEach((country) => {});
    console.log(country);
  }
})
.catch((e) => {
  console.log(e.message);//ACCESS ERROR MESSAGE PROPERTY DIRECTLY
});

// NON-ASYNC:
const getRate = (from, into) => {
  return axios.get(urlRates + from)// RETURN PROMISE !!!
  .then((response) => {
    return response.data.rates[into];
  })
};

const getCountries = (currency) => {
  return axios.get(urlCountries + currency)// RETURN PROMISE !!!
  .then((response) => {
    return response.data.map((country) => country.name);
  })
};

const convert = (from, into, amount) => {
  from = from.toUpperCase();
  into = into.toUpperCase();

  var rate;//helper variable

  return getRate(from, into).then((rateTemp) => {
    rate = rateTemp;//helper
    return getCountries(into).then((list) => {
      let converted = `${from} ${amount} = ${amount * rate} ${into}`;
      let exchanged = `${from}/${into} rate: ${rate}`;
      let countries = `Can be spent in: ${list.join(', ')}`;

      return {
        converted,
        exchanged,
        countries
      }
    })
  })
};

// convert('usd', 'eur', 10)
// .then((result) => {
//   console.log(result);
// })
// .catch((e) => {
//   console.log(e);
// });

// axios.get(urlListRates)
// .then(function(response) {
//   // console.log(response.data.rates.CAD);
//   let converted = amount * response.data.rates[intoCurrency];
//   console.log(`${fromCurrency} ${amount} = ${converted} ${intoCurrency}`);
//   return intoCurrency;
// })
// .then(function(intoCurrency) {
//   axios.get(urlCountries)
//   .then(function(response) {
//     // console.log(response);
//     let countries = response.data.map((item) => item.name);
//     console.log(`Can be spent in: `);
//     countries.map((item) => console.log(item));
//   })
// })
// .catch(function(e) {
//   console.log(e);
// });

// axios.get(urlCountries)
// .then(function(response) {
//   console.log(response);
//   let countries = response.data.name;
//   console.log(`Can be spent in: `);
// })
// .catch(function(e) {
//   console.log(e);
// });
