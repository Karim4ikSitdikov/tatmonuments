let monuments = [];

document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('monumentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const address = document.getElementById('address').value;
    const photo = document.getElementById('photo').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const photoUrl = e.target.result;
        const monument = { name, description, address, photoUrl };
        monuments.push(monument);
        displayMonuments();
    };
    reader.readAsDataURL(photo);

    document.getElementById('modal').classList.add('hidden');
    document.getElementById('notification').classList.remove('hidden');
    setTimeout(function() {
        document.getElementById('notification').classList.add('hidden');
    }, 3000);
});

document.getElementById('toggleMap').addEventListener('click', function() {
    var mapContainer = document.getElementById('mapContainer');
    if (mapContainer.classList.contains('hidden')) {
        mapContainer.classList.remove('hidden');
        document.getElementById('toggleMap').textContent = 'Hide Map';
    } else {
        mapContainer.classList.add('hidden');
        document.getElementById('toggleMap').textContent = 'Show Map';
    }
});

function displayMonuments() {
    const monumentsList = document.getElementById('monumentsList');
    monumentsList.innerHTML = '';
    monuments.forEach(monument => {
        const monumentItem = document.createElement('div');
        monumentItem.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        monumentItem.innerHTML = `
            <h3 class="text-xl font-bold">${monument.name}</h3>
            <p>${monument.description}</p>
            <p><strong>Address:</strong> ${monument.address}</p>
            <img src="${monument.photoUrl}" alt="Photo of ${monument.name}" class="w-full h-64 object-cover mt-2 rounded">
        `;
        monumentsList.appendChild(monumentItem);
    });
}

document.getElementById('openModal').addEventListener('click', function() {
    mapContainer.classList.add('hidden');
    document.getElementById('toggleMap').textContent = 'Show Map';
});

let groups = [
    {
        style: "islands#redIcon",
        items: [
            {
                center: [55.82366, 49.06082],
                name: "Место 1",
                balloonContentHeader: "Балун метки",
                balloonContentBody: "Содержимое <em>балуна</em> метки",
                balloonContentFooter: "Подвал",
                hintContent: "Хинт метки"
            },
            {
                center: [55.82360, 49.06482],
                name: "Место 2"
            },
            {
                center: [55.82306, 50.06082],
                name: "Место 3"
            },
            {
                center: [55.82066, 49.16082],
                name: "Место 4"
            }
        ]
    },
    {
        style: "islands#darkGreenIcon",
        items: [
            {
                center: [55.80366, 51.16082],
                name: "Место 1"
            },
            {
                center: [55.02366, 49.26082],
                name: "Место 2"
            },
            {
                center: [55.89366, 49.66082],
                name: "Место 3"
            },
            {
                center: [54.82366, 49.00082],
                name: "Место 4"
            },
            {
                center: [55.82766, 48.16082],
                name: "Место 5"
            }
        ]
    },
];



ymaps.ready(init);
    function init(){     
        var myMap = new ymaps.Map ('myMap', {
            center: [55.77194, 49.06219], //координаты центра
            zoom: 10,
            type: 'yandex#map'
        });
        var myPlacemark = new ymaps.Placemark([55.64466, 49.21875], { 
            balloonContentHeader: "Балун метки",
            balloonContentBody: "Содержимое <em>балуна</em> метки",
            balloonContentFooter: "Подвал",
            hintContent: "Хинт метки"
        }, {
        preset: 'twirl#blueStretchyIcon' //тип иконки
        });

        myMap.geoObjects.add(myPlacemark);

        for(let groupId in groups) {
            let group = groups[groupId]
    
            // Коллекция для геообъектов группы.
            let collection = new ymaps.GeoObjectCollection(null, { preset: group.style });
    
            // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);
    
            let lengthItem = group.items.length,
                item = {};
    
            for (let j = 0; j < lengthItem; j++) {
                item = group.items[j];
                // Создаем метку.
                let placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });
    
                // Добавляем метку в коллекцию.
                collection.add(placemark);
            }
        }
    }

        