const showCorrection = (arrayOfAttempts, index, operation) => {
  let stringOperation = operation.toString();
  console.log(stringOperation);
  switch (arrayOfAttempts[index]) {
    case 1:
      return `${stringOperation
        .substring(0, stringOperation.indexOf(' '))
        .toString()}`;
    case 2:
      return `${stringOperation
        .substring(0, stringOperation.indexOf(' ') + 2)
        .toString()}`;
    case 3:
      return `${stringOperation
        .substring(0, stringOperation.indexOf('= ') + 1)
        .toString()}`;
    case 4:
      return `${stringOperation}`;

    default:
      break;
  }
};

export { showCorrection };
