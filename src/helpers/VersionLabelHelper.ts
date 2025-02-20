const COMMIT_STATUS_RELEASE = "release";
const COMMIT_STATUS_COMMITTED = "committed";
const COMMIT_STATUS_DIRTY = "dirty";

export class VersionLabelHelper {
    private static getLabelIcon(state: string) {
        switch (state) {
            case COMMIT_STATUS_RELEASE:
                return "fa fa-cube";
            case COMMIT_STATUS_DIRTY:
                return "fa fa-wrench";
            case COMMIT_STATUS_COMMITTED:
                return "fa fa-code-fork"
        }
    }

    private static getLabelTitle(state: string, version: string) {
        switch (state) {
            case COMMIT_STATUS_RELEASE:
                return "Scalefast Workspace Version: " + version;
            case COMMIT_STATUS_DIRTY:
                return "Local workspace: UNCOMMITTED!";
            case COMMIT_STATUS_COMMITTED:
                return "Local workspace - MR: " + localStorage.getItem('insomnia-plugin-scalefast-sync.mergeRequestTitle') + ' - Commit hash: ' + localStorage.getItem('insomnia-plugin-scalefast-sync.commitId');
        }
    }

    static update() {
        let tag = localStorage.getItem('insomnia-plugin-scalefast-sync.currentRelease');
        let state = localStorage.getItem('insomnia-plugin-scalefast-sync.commitStatus');

        if (tag !== null) {
            let isDomReady = window.setInterval(function () {
                if (document !== null) { // DOM is ready
                    let element = document.getElementById('workspace-version-label');
                    if (typeof element === "undefined" || element === null) {
                        const target = document.querySelector('div.sidebar__item').querySelector('div.sidebar__expand');
                        element = document.createElement('span');
                        element.id = 'workspace-version-label';
                        target.insertAdjacentElement('beforebegin', element);
                    }

                    const icon = document.createElement('i');
                    icon.className = VersionLabelHelper.getLabelIcon(state);
                    icon.style.setProperty('margin-right', '4px');
                    element.textContent = tag === "local" ? "local workspace" : "v" + tag;
                    element.className = "version-label " + state;
                    element.title = VersionLabelHelper.getLabelTitle(state, tag);
                    element.insertAdjacentElement('afterbegin', icon);

                    window.clearInterval(isDomReady);
                }
            }, 200)
        }

    }

}