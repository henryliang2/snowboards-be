const snowboard = async(name, db) => { 
  const snowboardData = await db('snowboards')
    .where({ name })
    .catch((e) => { console.log(e)})
    .then(response => response[0])
  return snowboardData
}

const manufacturer = async(name, db) => {
  const snowboards = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer': 'manufacturers.manufacturer_name'})
    .where({ manufacturer: name })
    .catch((e) => { console.log(e)})
  console.log(snowboards)
  return {
    name,
    location: snowboards[0].location,
    snowboards: snowboards,
  }
}

const snowboards = async(args, db) => {

  let queryArguments;

  if (args.type)         queryArguments = { style: args.type };
  if (args.manufacturer) queryArguments = { manufacturer: args.manufacturer };

  const snowboards = await db('snowboards')
    .where(queryArguments)
    .catch((e) => { console.log(e)})

  console.log(snowboards);
  return snowboards;
}

module.exports = {
  snowboard,
  manufacturer,
  snowboards
}