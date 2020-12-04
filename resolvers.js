const manufacturer = async(name, db) => {
  const snowboards = await db('snowboards')
    .join('manufacturers', {'snowboards.manufacturer': 'manufacturers.manufacturer_name'})
    .where({ manufacturer: name })
    .catch((e) => { console.log(e)})
  console.log(snowboards)
  return {
    name,
    location: snowboards[0].location,
    logo: snowboards[0].logo,
    snowboards: snowboards,
  }
}

const snowboard = async(name, db) => { 
  const snowboardData = await db('snowboards')
    .where({ name })
    .then(response => response[0])
    .catch((e) => { console.log(e)})
    
  return snowboardData
}

const snowboards = async(args, db) => {

  let queryArguments;

  if      (args.type)         queryArguments = { style: args.type };
  else if (args.manufacturer) queryArguments = { manufacturer: args.manufacturer };
  else return {};

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