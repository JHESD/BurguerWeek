const { Restaurante, Hamburguesa } = require("../models");

exports.home = async (req, res) => {
  const restaurantes = await Restaurante.findAll({
    include: [Hamburguesa]
  });
  res.render("../views/index", { restaurantes });
};

exports.votar = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id);
  const nuevaCalificacion = parseFloat(req.body.calificacion);

  // Calificación anónima (promedio simple por ahora)
  hamburguesa.calificacion = (hamburguesa.calificacion + nuevaCalificacion) / 2;
  await hamburguesa.save();

  res.redirect("/");
};

exports.verHamburguesas = async (req, res) => {
  const id = req.params.id;

  try {
    const restaurante = await Restaurante.findByPk(id, {
      include: [Hamburguesa],
    });    

    if (!restaurante) {
      return res.status(404).send('Restaurante no encontrado');
    }

    res.render('restaurantes/hamburguesas', {
      restaurante,
      hamburguesas: restaurante.Hamburguesas, // <- con mayúscula
    });
    
  } catch (error) {
    res.status(500).send('Error al obtener hamburguesas');
  }
};
