const Usuario = require('./src/database/models/Usuario');
const Imagen = require('./src/database/models/Imagen');
const Cassette = require('./src/database/models/Cassette');
const Muestra = require('./src/database/models/Muestra');

async function testInsert() {
  try {
    console.log('🚀 Insertando datos de prueba...');

    // Crear un usuario
    const usuario = await Usuario.create({
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@example.com',
      password: '12345678As_',
      centro: 'Hospital Central',
      rol: 'administrador',
    });

    console.log('✅ Usuario creado:', usuario.toJSON());

    // Crear un cassette asociado al usuario
    const cassette = await Cassette.create({
      descripcion: 'Cassette de prueba',
      fecha: new Date(),
      organo: 'cerebro',
      caracteristicas: 'Tejido sano',
      observaciones: 'Ninguna',
      qr_cassette: 'codigoqr123',
      usuario_id: usuario.id, // Relación con Usuario
    });

    console.log('✅ Cassette creado:', cassette.toJSON());

    // Crear una muestra asociada al cassette
    const muestra = await Muestra.create({
      descripcion: 'Muestra de prueba',
      fecha: new Date(),
      tincion: 'Hematoxilina',
      observaciones: 'Ninguna',
      qr_muestra: 'muestraqr123',
      cassette_id: cassette.id, // Relación con Cassette
    });

    console.log('✅ Muestra creada:', muestra.toJSON());

    // Crear una imagen asociada a la muestra
    const imagen = await Imagen.create({
      imagen: Buffer.from('Imagen en formato binario'),
      muestra_id: muestra.id, // Relación con Muestra
    });

    console.log('✅ Imagen creada:', imagen.toJSON());

    console.log('🚀 Inserciones completadas con éxito. Verifica en phpMyAdmin.');

  } catch (error) {
    console.error('❌ Error insertando datos:', error);
  } finally {
    sequelize.close(); // Cierra la conexión a la BD después de insertar
  }
}

// Ejecutar la prueba
testInsert();