const { Offer } = require("../db.js");

//Retorna el detalle con el id pasado
const getOfferById = async (id) => {
  const offer = await Offer.findByPk(id)
  if(!offer) return "No hay ofertas con el id: " + id
  return offer;
};

//Retorna todos los detalles
const getAllOffer = async () => {
  const result = await Offer.findAll()
  
  return result 
};
// retorna todos los detalles de pedidos de el pedido con el id pasado por parametro
const getAllOfferById = async(id) => {
  const offer = await offer.findByPk(id)
  if(!offer) return {error: "Pedido no encontrado"}
  if(!offer.Offer.length) return { error: "EL pedido no tiene detalles de pedido"}
  return offer.Offer
}
//Elimina el detalle de pedido con el id pasado por parametro
const deleteOffer = async (id) => {
    const deleteOffer = await Offer.findByPk(id)
    if(deleteOffer){
        await Offer.destroy({
            where: { id }
        })
        return `la oferta con el id: ${id} fue eliminada`
    }
    else return `la oferta con el id: ${id} no fue encontrada`
}
//Edita el detalle con el id pasado
const editOffer = async (id,quantity, final_price, ) => {
    await Offer.findByPk(id)
        const newDetail = await Offer.update({
            quantity: quantity,
            final_price 
        },
        {
            where: { id }
        })
        // console.log(offer)
    
    if(!newDetail.length) return "oferta no encontrada"
    return "Oferta modificada"
    };
//Crea un nuevo detalle de pedido en la BD
const createOffer = async (discount_porc, availability) => {
    console.log(discount_porc, availability)
    if(!discount_porc || availability === undefined ) return {error: "faltan datos obligatorios"}
  const newoffer = await Offer.create(
    {
      discount_porc,
      availability
    }
  );
  return newoffer;
};
module.exports = {
  getOfferById,
  getAllOffer,
  deleteOffer,
  editOffer,
  createOffer,
  getAllOfferById
};
