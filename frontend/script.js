const form = document.querySelector('.form')
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/usuario/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const result = await response.json();

  if (result.success) {
    alert("Cadastro concluído!");
    localStorage.setItem('owner', JSON.stringify({id: result.results.insertId}))
    window.location.href = 'carro.html'
  } else {
    alert("Cadastro não concluído!");
  }
});

const formLogin = document.querySelector('.formLogin')
formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const password = document.getElementById('password').value

  const response = await fetch('http://localhost:3000/usuario/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  })

  const result = await response.json()

  if (result.success) {
    localStorage.setItem('owner', JSON.stringify(result.data))
    console.log(result)
    alert("Login concluído!");
    window.location.href = 'listagem.html'
  } else {
    alert("Usuário ou senha incorreta!");
  }
})

const formCar = document.querySelector('.formCar')
formCar?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const vehicle = document.getElementById('vehicle').value;
  const plate = document.getElementById('plate').value;
  const parking_space = document.getElementById('parking_space').value;
  const owner = JSON.parse(localStorage.getItem('owner')).id;


  const response = await fetch('http://localhost:3000/carro/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vehicle, plate, parking_space, owner})
  });

  const result = await response.json();

  if (result.success) {
    alert("Cadastro do veículo concluído!");
    window.location.href = 'listagem.html'
  } else {
    alert("Erro ao cadastrar veículo!");
    console.log(result)
  }
});

async function loadCars() {
  const response = await fetch('http://localhost:3000/carros')
  const data = await response.json()
  const tbody = document.querySelector('tbody')

  if (tbody.innerHTML ?? false) {
    tbody.innerHTML = ''
  }


  data.cars.forEach(car => {
    console.log(car, localStorage.getItem("owner"))
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${car.vehicle}</td>
      <td>${car.plate}</td>
      <td>${car.parking_space}</td>
      <td>
      ${car.owner === JSON.parse(localStorage.getItem('owner'))?.id ?`
        <button class='btn-delete-car' onclick='deleteCar(${car.id})'>Excluir veículo</button>
        <button class='btn-edit-car' onclick='editCar(${car.id})'>Editar veículo</button>`: "Nenhuma ação disponível"
      }
      </td>`
      
    tbody.appendChild(row)
  });
}

window.onload = () => {
  loadCars()
}

async function deleteCar(id) {
  await fetch(`http://localhost:3000/carros/${id}`, {
    method: 'DELETE',
  })
  loadCars()
}

async function editCar(id) {
  const vehicle = prompt("Ajuste o nome do veículo:")
  const plate = prompt("Ajuste a placa do veículo:")

  await fetch(`http://localhost:3000/carros/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vehicle, plate })
  })
  loadCars()
}

loadCars()