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

const style = async(type, db) => {
  const snowboards = await db('snowboards')
    .where({ style: type })
    .catch((e) => { console.log(e)})
  console.log(snowboards);
  return snowboards;
}

module.exports = {
  snowboard,
  manufacturer,
  style
}