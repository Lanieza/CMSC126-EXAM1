fetch("posts.json")
  .then((response) => response.json())
  .then((data) => {
    const entriesDiv = document.querySelector(".entries");

    data.forEach((post) => {
      const entry = document.createElement("div");
      entry.classList.add("entry");

      entry.innerHTML = `
                <a href="#" class="entry-title">${post.title}</a><a class="source" href="#"> (${post.source})</a>
                <p class="entry-meta">submitted ${post.submitted} by <a href="#" class="post-user">${post.user}</a></p>
                <div class="post-links"><button>${post.comments} comments</button> <button>share</button> <button>save</button> <button>hide</button> <button>report</button></div>
            `;

      entriesDiv.appendChild(entry);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

document.addEventListener("DOMContentLoaded", async function () {
  const commentsContainer = document.getElementById("comments-container");

  try {
    // Fetch comments.json
    const response = await fetch("comments.json");

    // Convert response to JSON
    const commentsData = await response.json();

    // Function to generate comment HTML
    function generateCommentHTML(comment) {
      let html = `
        <div class="comment">
        <div class="comment-body">
        <div class="header-comment">
          <span class="comment-user">${comment.user}</span>
          <span class="comment-score">${comment.score} points</span>
          <span class="comment-time">${comment.time}</span>
          <a id="comment-h-link">[ - ]</a>
        </div>
            <p class="comment">${comment.comment}</p>
            <div class="comment-actions">
              <a href="#">permalink</a>
              <a href="#">report</a>
              <a href="#">reply</a>
            </div>
          </div>
        </div>
      `;

      // If there are replies, recursively generate nested replies
      if (comment.replies && comment.replies.length > 0) {
        html += `<div class="replies">`;
        comment.replies.forEach((reply) => {
          html += generateCommentHTML(reply);
        });
        html += `</div>`;
      }

      return html;
    }

    // Generate and append comments
    commentsData.forEach((comment) => {
      commentsContainer.innerHTML += generateCommentHTML(comment);
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
});
