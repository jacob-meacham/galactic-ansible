import {MarkovWordGenerator} from './markov';
import * as rand from './random';

const nameGenerator = new MarkovWordGenerator('Sun Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto Ceres Pallas Vesta Hygiea Interamnia Europa Davida Sylvia Cybele Eunomia Juno Euphrosyne Hektor Thisbe Bamberga Patientia Herculina Doris Ursula Camilla Eugenia Iris Amphitrite Mercury Venus Earth Mars Asteroid Belt Jupiter Saturn Neptune Pluto Moon Terra Luna \
Adrastea Ganymede Callisto Europa Himalia Amalthea Thebe Elara Metis Pasiphae Carme \
Sinope Lysithea Ananke Leda Themisto Callirrhoe Praxidike Megaclite Locaste Taygete \
Kalyke Autonoe Harpalyke Titan Rhea Iapetus Dione Tethys Enceladus Mimas Hyperion \
Phoebe Janus Epimetheus Prometheus Pandora Titania Oberon Umbriel Ariel Miranda \
Sycorax Puck Portia Juliet Caliban Belinda Cressida Triton Proteus Nereid Larissa \
Galatea Despina Thalassa Charon', 2);

export function generateName() {
  let name = '';
  while (name.length < 4) {
    name = nameGenerator.fill(rand.randRange(5, 10));
  }

  return name[0].toUpperCase() + name.slice(1);
}

export function generateClassificationName() {
  return generateName();
  /*
  len = len || randRange(2, 8);
  let name = '';
  while (name.length < len)
  {
    const add = Math.random().toString(36).slice(2);
    name += add.slice(0, Math.min(add.length, (len - name.length)));
  }
  return name.toUpperCase();
  */
}

// function dateGenerator() {
//   let newDate = randRange(1, 30000) + ' ' + randomLetter().toUpperCase() + randomLetter().toUpperCase();

//   if (Math.random() < 0.25) {
//     newDate += randomLetter().toUpperCase();
//   }

//   return newDate;
// }
