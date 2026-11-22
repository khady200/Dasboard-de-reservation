const clientInput = document.getElementById('client')
const dateInput = document.getElementById('date')
const nightInput = document.getElementById('nights')
const addBtn = document.getElementById('add')
const tableBody = document.getElementById('table-body')
const errorP = document.getElementById('error')
const totalResrvationSpan = document.getElementById('total-reservation')
const totalNightSpan = document.getElementById('total-nights')
const avgNightSpan = document.getElementById('avg-nights')

let reservations = []

if (localStorage.getItem("reservations")) {
    reservations = JSON.parse(localStorage.getItem("reservations"))
    renderTable()
    updateStats()
}

addBtn.addEventListener('click', () => {
    const client = clientInput.value.trim()
    const date = dateInput.value
    const night = Number(nightInput.value)

    if (!client || !night || !date) {
        errorP.textContent = 'Veuillez remplir tous les champs'
        return
    }
    errorP.textContent = ""

    reservations.push({ client, date, night })
    save()
    renderTable()
    updateStats()

    clientInput.value = ""
    dateInput.value = ""
    nightInput.value = ""
})

// Afficher le tableau
function renderTable() {
    tableBody.innerHTML = ""
    reservations.forEach((res, index) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${res.client}</td>
        <td>${res.date}</td>
        <td>${res.night}</td>
        <td><button class="action-btn" onclick="removeReservation(${index})">Supprimer</button></td>
        `
        tableBody.appendChild(row)
    })
}

function removeReservation(index) {
    reservations.splice(index, 1)
    save()
    renderTable()
    updateStats()
}
window.removeReservation = removeReservation

function save() {
    localStorage.setItem("reservations", JSON.stringify(reservations))
}

function updateStats() {
    const totalReservations = reservations.length
    const totalNights = reservations.reduce((sum, r) => sum + r.night, 0)
    const avgNights = totalReservations > 0 ? totalNights / totalReservations : 0
    totalResrvationSpan.textContent = totalReservations
    totalNightSpan.textContent = totalNights
    avgNightSpan.textContent = avgNights.toFixed(1)
}