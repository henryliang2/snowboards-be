const manufacturer = async(name, db) => {
  const snowboards = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer_id': 'manufacturers.id'})
    .where({ manufacturer_name: name })

  return {
    name,
    location: snowboards[0].location,
    logo: snowboards[0].logo,
    snowboards: snowboards,
  }
}

const snowboard = async(name, db) => { 
  const response = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer_id': 'manufacturers.id'})
    .where({ name })

  const snowboard = {
    ...response[0],
    manufacturer: response[0].manufacturer_name
  }
  
  return snowboard
}

const snowboards = async(args, db) => {

  let queryArguments;
  if      (args.type)         queryArguments = { style: args.type };
  else if (args.manufacturer) queryArguments = { manufacturer_name: args.manufacturer };
  else return {};

  const snowboards = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer_id': 'manufacturers.id'})
    .where(queryArguments)
    .then(snowboards => snowboards.map((snowboard) => ({
        ...snowboard,
        manufacturer: snowboard.manufacturer_name
      })
    ))
  
  return snowboards
}

module.exports = {
  snowboard,
  manufacturer,
  snowboards
}