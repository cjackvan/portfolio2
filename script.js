const gallery = document.querySelector(".gallery");
const projects = document.querySelectorAll(".project");
const desktopQuery = window.matchMedia("(min-width: 901px)");

projects.forEach((project) => {
  const trigger = project.querySelector(".project-trigger");
  const backButton = project.querySelector(".back-button");
  const detail = project.querySelector(".project-detail");

  trigger.addEventListener("click", (event) => {
    if (project.classList.contains("is-active") && gallery.classList.contains("is-detail-view")) {
      closeDetail();
      return;
    }

    event.stopPropagation();
    openDetail(project, detail);
  });

  backButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeDetail();
  });

  detail.addEventListener("click", () => {
    if (desktopQuery.matches) {
      return;
    }

    if (project.classList.contains("is-active") && gallery.classList.contains("is-detail-view")) {
      closeDetail();
    }
  });
});

document.body.addEventListener("click", () => {
  if (!desktopQuery.matches || !gallery.classList.contains("is-detail-view")) {
    return;
  }

  closeDetail();
});

function openDetail(project, detail) {
  gallery.classList.add("is-detail-view");
  document.body.classList.add("is-detail-view");

  projects.forEach((item) => {
    item.classList.remove("is-active");
    item.querySelector(".project-detail").hidden = true;
    resetBlurbSide(item.querySelector(".project-detail"));
  });

  project.classList.add("is-active");
  detail.hidden = false;
  positionBlurbSide(project, detail);
}

function closeDetail() {
  gallery.classList.remove("is-detail-view");
  document.body.classList.remove("is-detail-view");

  projects.forEach((project) => {
    project.classList.remove("is-active");
    const detail = project.querySelector(".project-detail");
    detail.hidden = true;
    resetBlurbSide(detail);
  });
}

function positionBlurbSide(project, detail) {
  if (!desktopQuery.matches) {
    return;
  }

  const rect = project.getBoundingClientRect();
  const blurbWidth = 340;
  const spaceLeft = rect.left;
  const spaceRight = window.innerWidth - rect.right;

  detail.classList.remove("blurb-left", "blurb-right");

  if (spaceRight >= spaceLeft && spaceRight >= blurbWidth) {
    detail.classList.add("blurb-right");
  } else {
    detail.classList.add("blurb-left");
  }
}

function resetBlurbSide(detail) {
  detail.classList.remove("blurb-left", "blurb-right");
}

window.addEventListener("resize", () => {
  const activeProject = document.querySelector(".project.is-active");
  if (!activeProject || !gallery.classList.contains("is-detail-view")) {
    return;
  }

  positionBlurbSide(activeProject, activeProject.querySelector(".project-detail"));
});
