const finite=(value,label)=>{const number=Number(value);if(!Number.isFinite(number))throw new RangeError(`Enter a valid ${label}.`);return number;};

export const ROTH_401K_LIMITS_2026={under50:24500,age50plus:32500,age60to63:35750};
export function calculateRoth401k({currentBalance=0,monthlyContribution,years,annualReturnPercent,ageGroup='under50'}){
  const balance=finite(currentBalance,'current balance'),monthly=finite(monthlyContribution,'monthly contribution'),term=finite(years,'number of years'),rate=finite(annualReturnPercent,'annual return');
  if(balance<0||monthly<0||term<=0||term>70||rate<=-100||rate>50||!ROTH_401K_LIMITS_2026[ageGroup])throw new RangeError('Use nonnegative balances and contributions, 1–70 years, a return above −100% and no more than 50%, and a supported age group.');
  const months=Math.round(term*12);const monthlyRate=rate/100/12;let endingBalance=balance;
  for(let i=0;i<months;i++)endingBalance=endingBalance*(1+monthlyRate)+monthly;
  const contributions=monthly*months;const growth=endingBalance-balance-contributions;const annualContribution=monthly*12;const limit=ROTH_401K_LIMITS_2026[ageGroup];
  return{endingBalance,contributions,growth,annualContribution,limit,overLimit:annualContribution>limit,months};
}

export function calculateSchdScenario({initialInvestment=0,monthlyInvestment=0,years,annualTotalReturnPercent,forwardYieldPercent}){
  const initial=finite(initialInvestment,'initial investment'),monthly=finite(monthlyInvestment,'monthly investment'),term=finite(years,'number of years'),rate=finite(annualTotalReturnPercent,'annual total return'),yieldRate=finite(forwardYieldPercent,'forward dividend yield');
  if(initial<0||monthly<0||initial+monthly<=0||term<=0||term>70||rate<=-100||rate>50||yieldRate<0||yieldRate>20)throw new RangeError('Enter an investment above zero, 1–70 years, a return above −100% and no more than 50%, and a yield from 0% to 20%.');
  const months=Math.round(term*12),monthlyRate=rate/100/12;let endingValue=initial;for(let i=0;i<months;i++)endingValue=endingValue*(1+monthlyRate)+monthly;
  const contributions=monthly*months;return{endingValue,contributions,growth:endingValue-initial-contributions,estimatedAnnualDividends:endingValue*yieldRate/100,months};
}

export function calculateTirePressureTemperature({unitSystem='psi',measuredPressure,measuredTemperature,targetTemperature}){
  const pressure=finite(measuredPressure,'measured pressure'),from=finite(measuredTemperature,'measured temperature'),to=finite(targetTemperature,'target temperature');
  const psi=unitSystem==='kpa'?pressure/6.894757293:pressure;const fromK=unitSystem==='kpa'?from+273.15:(from-32)*5/9+273.15;const toK=unitSystem==='kpa'?to+273.15:(to-32)*5/9+273.15;
  if(!['psi','kpa'].includes(unitSystem)||psi<0||psi>150||fromK<=0||toK<=0)throw new RangeError('Enter a supported unit, nonnegative passenger-tire pressure, and temperatures above absolute zero.');
  const atmosphericPsi=14.6959;const estimatedPsi=(psi+atmosphericPsi)*toK/fromK-atmosphericPsi;
  return{estimatedPressure:unitSystem==='kpa'?estimatedPsi*6.894757293:estimatedPsi,pressureChange:unitSystem==='kpa'?(estimatedPsi-psi)*6.894757293:estimatedPsi-psi,unit:unitSystem==='kpa'?'kPa':'psi'};
}

function parsePolynomial(expression){
  const clean=String(expression).replace(/\s+/g,'').replace(/−/g,'-');if(!clean||!/^[0-9xy+\-.*^]+$/i.test(clean))throw new RangeError('Use a polynomial with numbers, x, y, +, −, *, and nonnegative integer exponents.');
  const terms=(clean.startsWith('-')?clean:`+${clean}`).match(/[+-][^+-]+/g);if(!terms?.length)throw new RangeError('Enter at least one polynomial term.');
  return terms.map(raw=>{const sign=raw[0]==='-'?-1:1;const body=raw.slice(1);if(!body)throw new RangeError('Check the polynomial signs.');let coefficient=sign,xPower=0,yPower=0;for(const factor of body.split('*')){if(/^\d*\.?\d+$/.test(factor)){coefficient*=Number(factor);continue;}const match=factor.match(/^([xy])(?:\^(\d+))?$/i);if(!match)throw new RangeError('Separate factors with * and use only x or y with nonnegative integer exponents.');const power=match[2]?Number(match[2]):1;if(power>20)throw new RangeError('Use exponents from 0 to 20.');if(match[1].toLowerCase()==='x')xPower+=power;else yPower+=power;}return{coefficient,xPower,yPower};});
}
const formatPolynomial=terms=>{const pieces=[];for(const term of terms){if(Math.abs(term.coefficient)<1e-12)continue;const factors=[];for(const [variable,power] of [['x',term.xPower],['y',term.yPower]])if(power>0)factors.push(power===1?variable:`${variable}^${power}`);const magnitude=Math.abs(term.coefficient);const coeffText=factors.length&&Math.abs(magnitude-1)<1e-12?'':String(Number(magnitude.toFixed(10)));const body=[coeffText,...factors].filter(Boolean).join('*')||'0';pieces.push(`${term.coefficient<0?'-':pieces.length?'+':''}${body}`);}return pieces.join('')||'0';};
export function calculatePartialDerivative({expression,variable='x',xValue,yValue}){
  if(!['x','y'].includes(variable))throw new RangeError('Differentiate with respect to x or y.');const terms=parsePolynomial(expression);const derivative=terms.map(term=>{const power=variable==='x'?term.xPower:term.yPower;return{coefficient:term.coefficient*power,xPower:term.xPower-(variable==='x'&&power?1:0),yPower:term.yPower-(variable==='y'&&power?1:0)};});
  const derivativeExpression=formatPolynomial(derivative);let value=null;if(xValue!==''&&xValue!=null&&yValue!==''&&yValue!=null){const x=finite(xValue,'x value'),y=finite(yValue,'y value');value=derivative.reduce((sum,t)=>sum+t.coefficient*x**t.xPower*y**t.yPower,0);}return{derivativeExpression,value,termCount:terms.length};
}

export function calculateEdpi({mouseDpi,inGameSensitivity,targetDpi}){
  const dpi=finite(mouseDpi,'mouse DPI'),sensitivity=finite(inGameSensitivity,'in-game sensitivity');if(dpi<=0||dpi>100000||sensitivity<0||sensitivity>1000)throw new RangeError('Enter mouse DPI above zero and a nonnegative in-game sensitivity.');
  const edpi=dpi*sensitivity;let equivalentSensitivity=null;if(targetDpi!==''&&targetDpi!=null){const target=finite(targetDpi,'target DPI');if(target<=0||target>100000)throw new RangeError('Target DPI must be above zero.');equivalentSensitivity=edpi/target;}return{edpi,equivalentSensitivity};
}
