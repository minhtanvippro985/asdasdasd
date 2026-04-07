document.addEventListener("DOMContentLoaded", () => {
    const viewId = localStorage.getItem('viewArticleId');
    const allArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const allUsers = JSON.parse(localStorage.getItem('users')) || []; 

    if (!viewId) {
        alert("Không tìm thấy bài viết!");
        window.history.back();
        return;
    }
    
    const article = allArticles.find(arti => String(arti.id) === String(viewId));

    if (article) {
        const authorInfo = allUsers.find(u => u.email === article.author || u.lastname === article.author);

       
        const authorImg = document.querySelector('.post-main .avatar');
        if (authorImg) {
            authorImg.src = authorInfo?.avatar || authorInfo?.img || '/assets/imagers/user_PFP.png';
        }

    
        document.querySelector('.post-title').innerText = article.title;
        document.querySelector('.post-text').innerText = article.content;

       
        if (article.image) {
            const contentCard = document.querySelector('.post-content-card');
            const imgTag = document.createElement('img');
            imgTag.src = article.image;
            
            // CSS trực tiếp để ảnh vừa vặn, không quá to
            imgTag.style.width = "100%";
            imgTag.style.maxWidth = "600px"; // Giới hạn chiều rộng tối đa
            imgTag.style.maxHeight = "400px"; // Giới hạn chiều cao tối đa
            imgTag.style.display = "block";
            imgTag.style.margin = "0 auto 20px auto"; // Căn giữa ảnh
            imgTag.style.objectFit = "cover"; // Cắt ảnh vừa khung nếu tỉ lệ lạ
            imgTag.style.borderRadius = "12px";
            imgTag.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; // Thêm chút đổ bóng cho sang

            contentCard.insertBefore(imgTag, document.querySelector('.post-title'));
        }
    } else {
        alert("Không tìm thấy bài viết");
        window.history.back();
    }

    document.getElementById('btn-back').addEventListener('click', () => {
        window.history.back();
    });
});