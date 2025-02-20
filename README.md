# Gitlab Sync plugin for Insomnia API Client

This plugin for Insomnia aims to ease syncing your workspaces, directories or even single requests to your Git repositories. Right now GitLab is supported.
This plugin is based on [Insomnia Universal Git](https://insomnia.rest/plugins/insomnia-plugin-universal-git) and modified to adapt to Scalefast needs, so if you are not a Scalefast developer probably it doesn't make sense that you use this plugin, and I recommend you to install and use the aforementioned plugin. 

## Installation

Just install it via the [Insomnia Plugin Hub](https://insomnia.rest/plugins) or using the Insomnia plugin interface and using 

```
@scalefast/insomnia-plugin-scalefast-sync 
```
as npm package to install.  


## How to use this plugin

This plugin has several features to keep your workspace synced with your repo, pull workspace from gitlab repository, push workspace changes to gitlab repository and request merge. Besides that three actions you can fetch and reset your local workspace to the latest stable release found in the repository.

After installing just hit the dropdown menu located right beneath the workspace/collections name, go through the setup and start pulling/pushing your config. The first time you configure the plugin it will search for your work branch and sync your local workspace with it if they found it, if not, it will sync your local workspace with the latest stable release in the repository.


![server configuration](https://i.postimg.cc/SRZBC7my/plugin-menu.png)

### Get current release
Using this option you can sync your local workspace with the latest stable release found in the repository.

### Push workspace
Pursuing simplicity and transparency for the user the push flow it as follows, every time the user tries to push changes:
 - The plugin checks for the existence of branch with the form of username_collection_updates, if not found creates it.
 - The plugin commits changes to the configured repository.
 - If the branch is deleted as a merge result, the plugin will recreate it in the next push attempt.

### Pull workspace
Using this option, the plugin will sync your local workspace with the most recent commit in your work branch, you should be using this option to continue your work after a release sync, for example. 

### Request merge
This option simply opens a new merge request between your work branch and the master branch. Use this option when you finish a feature, and want it to be merged and released to the rest of the team. 

## UI Changes

The plugin modifies Insomnia UI to give you quick visual indications related to the state of your workspace, near the workspace name you will find a little pill with different colors depending on the status of your workspace in a given moment.  

If you are using an unmodified workspace release you will get a purple pill with the version of thw workspace you are using.

![release indicator](https://i.postimg.cc/BvHkvfyc/release.png)

If you are using your work branch, with or without an opened merge request, you will get a yellow pill like the one in the nest image. If you pass your mouse over the pill, you will get a tooltip with merge request/commit information.

![work branch indicator](https://i.postimg.cc/3xyzPvFq/commited.png)

If you have uncommitted changes you will get a red pill like the one in the following image. You will get a warning and a confirm dialog if you try to sync your workspace when in a "dirty" state, anyway, due to the way Insomnia imports workspaces only coincident resources will be synced, I mean, if you have, for example, a group of requests in your local workspace that are not in the release, the sync operation will not touch them, making hard to lose local work on updates.

![uncommitted changes indicator](https://i.postimg.cc/vZpCMZPZ/dirty.png)

## Setup

* Base URL: Your GitLabs' URL.
* Access Token: Create an [access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) with "api" scope.
* Project ID: Create a new project to store your configs directly in GitLab and enter the project id which you find in the settings.
* Workspace File Name: The file your workspace will be stored under (JSON). Choose this freely.

![server configuration](https://i.postimg.cc/sgJLWJ5R/plugin-setup.png)

## Notes
This is the result of the first three days of React development in my life, maybe, or almost sure, the code is crap and has bugs and malfunctions. Please, if you find one, open an issue. If you want to improve the code, please open a pull request, all help is welcome.

Be merciful.

