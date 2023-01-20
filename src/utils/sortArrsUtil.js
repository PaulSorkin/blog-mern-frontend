//The function below sorts na Array by provided field in it
//For example: Arr.sort(byField('name'));

function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

export default byField;