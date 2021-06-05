import { ethers } from 'ethers'

// Data checks
export const isUndefined = ({input}) => {
  return (typeof input === "undefined");
}

export const isNull = ({input}) => {
  return (typeof input === undefined);
}

export const isBoolean = ({input}) => {
  return (typeof input === "boolean");
}

export const isNumber = ({input}) => {
  return (typeof input === "number");
}

export const isString = ({input}) => {
  return (typeof input === "string");
}

export const isFunction = ({input}) => {
  return (typeof input === "function");
}

export const isObject = ({input}) => {
  return (typeof input === "object");
}



export const isAddress = ({value}) => {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

export const shortenAddress = ({address, digits = 4}) => {
  if (!isAddress({value:address})) {
    console.log(`Invalid 'address' parameter '${address}'.`)
  	return null
  }
  return `${address.substring(0, digits + 2)}...${address.substring(42 - digits)}`
}


export const isEmpty = ({input}) => {
  return (input.length === 0);
}

export const isStringEmpty = ({input}) => {
  return (input.length === 0);
}

export const isTrue = ({input}) => {
  return (input === true);
}

export const isFalse = ({input}) => {
  return (input === false);
}

