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

fetch("comments.json")
  .then((response) => response.json())
  .then((data) => {
    const commentsSection = document.querySelector(".comments");

    function createCommentHTML(comment, isReply = false) {
      const div = document.createElement("div");
      div.classList.add("comment");
      if (isReply) div.classList.add("reply");

      div.innerHTML = `
                <strong>${comment.user}</strong> <span class="comment-score">(${comment.score} points - ${comment.time})</span>
                <p>${comment.comment}</p>
            `;

      if (comment.replies) {
        comment.replies.forEach((reply) => {
          div.appendChild(createCommentHTML(reply, true));
        });
      }

      return div;
    }

    data.forEach((comment) => {
      commentsSection.appendChild(createCommentHTML(comment));
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
