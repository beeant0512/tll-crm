export const toggleForm = (e) => {
  const { expandForm } = e.state;
  e.setState({
    expandForm: !expandForm,
  });
};

export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

export const getTableFilter = (pagination, filtersArg, sorter, formValues) => {
  const filters = Object.keys(filtersArg).reduce((obj, key) => {
    const newObj = { ...obj };
    newObj[key] = getValue(filtersArg[key]);
    return newObj;
  }, {});

  const params = {
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    ...formValues,
    ...filters,
  };
  if (sorter.field) {
    params.sorter = `${sorter.field}_${sorter.order}`;
  }
};
