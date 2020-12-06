const manufacturer = async(name, db) => {
  const snowboards = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer': 'manufacturers.manufacturer_name'})
    .where({ manufacturer: name })

  return {
    name,
    location: snowboards[0].location,
    logo: snowboards[0].logo,
    snowboards: snowboards,
  }
}

const snowboard = async(name, db) => { 
  const response = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer': 'manufacturers.manufacturer_name'})
    .where({ name })

  console.log(response[0])
  
  return response[0]
}

const snowboards = async(args, db) => {

  let queryArguments;
  if      (args.type)         queryArguments = { style: args.type };
  else if (args.manufacturer) queryArguments = { manufacturer: args.manufacturer };
  else return {};

  const snowboards = await db('snowboards')
    .where(queryArguments)
  
  return snowboards;
}

module.exports = {
  snowboard,
  manufacturer,
  snowboards
}