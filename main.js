const setlistArray = [
    "Pajama Drive",
    "Aturan Anti Cinta",
    "Matahari Milikku",
    "Demi Seseorang",
    "Gadis Gadis Remaja",
    "Sambil Menggandeng Erat Tanganku",
    "Dewi Theater",
    "Bel Terakhir Berbunyi",
    "Saka Agari",
    "Sekarang Sedang Jatuh Cinta",
    "Fajar Sang Idola",
    "Tunas di Balik Seragam",
    "Cara Meminum Ramune",
    "Ingin Bertemu",
    "Banzai",
    "Romansa Sang Gadis",
    "Himawari Gumi"
];

const memberList = [
    "Amanda Sukma",
    "Angelina Christy",
    "Aurellia",
    "Azizi Asadel",
    "Callista Alifia",
    "Cornelia Vanisa",
    "Febriola Sinambela",
    "Feni Fitriyanti",
    "Fiony Alveria",
    "Flora Shafiq",
    "Freya Jayawardana",
    "Gabriela Abigail",
    "Gita Sekar Andarini",
    "Helisma Putri",
    "Indah Cahya",
    "Indira Seruni",
    "Jessica Chandra",
    "Jesslyn Elly",
    "Kathrina Irene",
    "Lulu Salsabila",
    "Marsha Lenathea",
    "Mutiara Azzahra",
    "Raisha Syifa",
    "Reva Fidela",
    "Shani Indira Natio",
    "Shania Gracia",
    "Abigail Rachel",
    "Adeline Wijaya",
    "Aisa Maharani",
    "Alya Amanda",
    "Anindya Ramadhani",
    "Aurhel Alana",
    "Catherina Vallencia",
    "Cathleen Nixie",
    "Celline Thefani",
    "Chelsea Davina",
    "Cynthia Yaputera",
    "Dena Natalia",
    "Desy Natalia",
    "Fritzy Rosmerian",
    "Gendis Mayrannisa",
    "Grace Octaviani",
    "Greesella Adhalia",
    "Hillary Abigail",
    "Jazzlyn Trisha",
    "Jeane Victoria",
    "Letycia Moreen",
    "Michelle Alexandra",
    "Michelle Levia",
    "Nayla Suji",
    "Nina Tutachia",
    "Oline Manuel",
    "Regina Wilian",
    "Ribka Budiman",
    "Shabilqis Naila",
    "Victoria Kimberly"
];

document.addEventListener("DOMContentLoaded", function () {
    displayMemberList();
    const setlistSelect = document.getElementById("setlist");
    setlistArray.sort();
    setlistArray.forEach(setlistItem => {
        const option = document.createElement("option");
        option.value = setlistItem;
        option.text = setlistItem;
        setlistSelect.appendChild(option);
    });
});

function displayMemberList() {
    const memberListDiv = document.getElementById("memberList");

    memberList.forEach(member => {
        const memberButton = document.createElement("button");
        memberButton.innerText = member;
        memberButton.className = "bg-red-500 text-white p-2 mb-2 mr-2 rounded-full mobile-btn-size";
        memberButton.onclick = function () {
            moveToSetlist(memberButton);
        };
        memberListDiv.appendChild(memberButton);
    });
}

function updateSetlist() {
    const selectedSetlist = document.getElementById("setlist").value;
    const selectedDateTime = document.getElementById("showDateTime").value;

    changeSetlist(selectedSetlist, selectedDateTime);
}

function changeSetlist(selectedSetlist, selectedDateTime) {
    const selectedSetlistMembers = memberList.filter(member => member.includes(selectedSetlist));
    displaySetlistMembers(selectedSetlistMembers);

    const setlistCardDiv = document.createElement("div");
    setlistCardDiv.className = "bg-white p-4 mb-4 rounded-md";

    setlistCardDiv.innerHTML = `<h2 class="text-lg font-semibold mb-2">${selectedSetlist} | ${selectedDateTime}</h2>`;

    const setlistContainer = document.getElementById("setlistContainer");
    setlistContainer.innerHTML = "";
    setlistContainer.appendChild(setlistCardDiv);
}

function moveToSetlist(memberButton) {
    const selectedSetlist = document.getElementById("setlist").value;
    const selectedDateTime = document.getElementById("showDateTime").value;

    document.getElementById("formSetlist").style.display = "none";
    document.getElementById("formShowDateTime").style.display = "none";

    const setlistContainer = document.getElementById("setlistContainer");

    let setlistCard = document.getElementById(`setlistCard-${selectedSetlist}`);
    if (!setlistCard) {
        setlistCard = document.createElement("div");
        setlistCard.id = `setlistCard-${selectedSetlist}`;
        setlistCard.className = "bg-white p-4 mb-4 rounded-md";
        setlistCard.innerHTML = `<h2 class="text-lg font-semibold mb-2">${selectedSetlist} | ${selectedDateTime}</h2>`;
        setlistContainer.appendChild(setlistCard);
    }

    if (setlistCard.children.length > 16) {
        showModal("Maksimal 16 member wots.");
        return;
    }

    const memberName = memberButton.innerText;
    const memberButtonClone = createMemberButton(memberName);
    memberButtonClone.onclick = function () {
        removeFromSetlist(memberButtonClone, setlistCard);
    };

    setlistCard.appendChild(memberButtonClone);

    memberButton.style.display = "none";

    updateMemberListSectionVisibility();
}


function removeFromSetlist(button, setlistCard) {
    const memberListDiv = document.getElementById("memberList");
    const memberButton = createMemberButton(button.innerText);
    memberButton.onclick = function () {
        moveToSetlist(memberButton);
    };

    const nextButton = getNextButton(button);
    if (nextButton) {
        memberListDiv.insertBefore(memberButton, nextButton);
    } else {
        memberListDiv.appendChild(memberButton);
    }

    setlistCard.removeChild(button);

    updateMemberListSectionVisibility();
}

function updateMemberListSectionVisibility() {
    const setlistContainer = document.getElementById("setlistContainer");
    const setlistCard = setlistContainer.firstElementChild;

    if (setlistCard && setlistCard.children.length <= 16) {
        document.getElementById("memberListSection").style.display = "block";
    } else {
        document.getElementById("memberListSection").style.display = "none";
    }
}

function createMemberButton(memberName) {
    const memberButton = document.createElement("button");
    memberButton.innerText = memberName;
    memberButton.className = "bg-red-500 text-white p-2 mb-2 mr-2 rounded-full mobile-btn-size";
    memberButton.onclick = function () {
        moveToSetlist(memberButton.innerText);
    };

    return memberButton;
}

function getNextButton(button) {
    const memberListDiv = document.getElementById("memberList");
    const buttons = Array.from(memberListDiv.getElementsByTagName("button"));
    const index = buttons.indexOf(button);
    if (index !== -1 && index < buttons.length - 1) {
        return buttons[index + 1];
    }
    return null;
}

function displaySetlistMembers(members) {
    const selectedSetlistDiv = document.getElementById("selectedSetlist");
    selectedSetlistDiv.innerHTML = "";

    if (members.length > 0) {
        members.forEach(member => {
            const memberDiv = document.createElement("div");
            memberDiv.className = "bg-white p-2 mb-2 rounded-md";
            memberDiv.innerText = member;
            selectedSetlistDiv.appendChild(memberDiv);
        });
    }
}

function showModal(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'OK'
    });
}
