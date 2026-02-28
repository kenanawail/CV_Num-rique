const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');
const backProfileBtn = document.querySelector('.back-profil');

let totalPage = pages.length;
let pageNumber = 0;

// أزرار Next / Back
pageTurnBtn.forEach((btn, index) => {
    btn.onclick = () => {
        const pageId = btn.getAttribute('data-page');
        const page = document.getElementById(pageId);
        if (!page) return;

        if (btn.classList.contains('back')) {
            page.classList.remove('turn');
            setTimeout(() => page.style.zIndex = 20 - index, 500);
            pageNumber = Math.max(0, pageNumber - 1);
        } else {
            page.classList.add('turn');
            page.style.zIndex = 20 + index;
            pageNumber = Math.min(totalPage - 1, pageNumber + 1);
        }
    };
});

// Contact Me: يقلب جميع الصفحات تدريجيًا
contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');
            setTimeout(() => page.style.zIndex = 20 + index, 500);
            pageNumber = index + 1;
        }, (index + 1) * 200 + 100);
    });
};

backProfileBtn.onclick = (e) => {
    e.preventDefault();

    pages.forEach((page, index) => {
        page.classList.remove('turn'); // إزالة الدوران من كل الصفحات
        page.style.zIndex = 20 - index; // إعادة ترتيب الطبقات
    });

    pageNumber = 0; // إعادة الرقم الحالي للصفحة الأولى
};


window.addEventListener('DOMContentLoaded', () => {
    pageNumber = 0; // الصفحة الحالية = الصفحة 0 (البروفايل)

    pages.forEach((page, index) => {
        page.classList.remove('turn'); // إزالة أي دوران
        page.style.zIndex = 20 - index; // ترتيب الطبقات من الأعلى إلى الأسفل
    });
});


 var form = document.getElementById("my-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    var status = document.getElementById("my-form-status");

    // تحويل البيانات إلى JSON
    var data = {
        nom: form.nom.value,
        prenom: form.prenom.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        let response = await fetch("https://formspree.io/f/mzdabvrz", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            status.innerHTML = "Message envoyé avec succès ! ✅";
            form.reset();
        } else {
            let result = await response.json();
            if (result.errors) {
                status.innerHTML = result.errors.map(e => e.message).join(", ");
            } else {
                status.innerHTML = "Oops! Il y a eu un problème lors de l'envoi.";
            }
        }
    } catch (error) {
        status.innerHTML = "Oops! Il y a eu un problème lors de l'envoi.";
        console.error(error);
    }
});