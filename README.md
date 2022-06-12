# GoGetEm
Mobile chasing game built with React Native and Expo
![MainMenu](assets/screenshots/MainMenu.jpg =300X500)

- Gameplay is inspired by Atari-style 8-bit games, but includes a modern smooth, gradient-based, and colourful artstyle
- 138 levels of unlockable content including controller configuration and background customisation
- Incorporates 4 difficulty levels, and 4 modes of gameplay (discussed below)
- Uses liquid swipe for menu UI/UX
- Various AI algorithms were implemented from scratch, including recursive depth-first search maze generation and an A* traversal algorithm
- Player progression is saved on-device through Async Storage

## There are four modes of gameplay:
### Classic
A three player chasing game, in which you must catch your target before your target catches their target, and their target catches you
### Chasedown
Another three player game, in which players take turns being the target, and must evade the other two players before time runs out
### Hunt
Two players face off against each other to catch randomly placed targets within the maze before time runs out
### TagTeam
Two teams of two players face off; each team has a chaser and a target, whoever's chaser catches the other team's target wins
