# galactic-ansible

A gamma blast has scoured the dominant race, the Aaxians (a dark matter, silicon-based lifeform), from the universe. Beyond a few, crumbling monuments, their only legacy is the galactic ansible, a solar-system sized computer capable of faster-than-light communication. It has somehow gotten ahold of a twitter account, and is fruitlessly continuing its goal of documenting the universe.

Keep everything in a hierarchical DB. Both parent and child pointers are stored, along with a name. Movement can happen up or down the hierarchy, either defining more at a current node, adding a sibling node, or adding a child node. At some levels, there are a finite number of children (for instance, number of planets in a solar system), so we must keep that constraint in mind.

Node
	Parent
	Max. Children
	Name
	Children
	Characteristics (based on node type)

Algorithm:
	From the current node, do a random walk to get to a new node.
	With probability n, define a new characteristic on that node.
	With probability n, add a new child to that node (if applicable)
	With probability n, add new new sibling to that node (if applicable)
	To avoid getting caught too low in the weeds, have a teleportation to a different level in the hierarchy. Prefer sitting in the middle of the hierarchy (ie galactic civilizations and planets), rather than too low. Possibly could try to move towards underspecified parts of the system (ie fewer characteristics/children). Basically, build an actual tree and score it.

	If someone requests a node by name (@galacticansible tell me more about Oprah IV), reset the node pointer to there and then run the algorithm to define a new characteristic, add a sibling, or add a child. If none of these is possible, do a walk up the hierarchy and do the same.

Use Postgres as the DB.

The <name> galaxy is a <type> galaxy.
	Its nearest neighbor is <name> galaxy | <black-hole> | <dark-matter-reactor>
	Its prominent feature is a <black-hole> | <dyson-sphere> | <intelligent-life-form> | <historic-event>
	It has <x stars> | <x planets> | <x fast-food-restaurants> | etc.

The <name> solar system is
	Named for <historical-event> | <alien-race> | <famous-alien> | <sector>
	Has <x planets> | <x planetoids> | <x asteroids> | <interesting-characteristic>

The <name> planet is

The <name> alien race is

<planet>
	<name>
	<atmosphere>
	<geography>
	<age>
	<life?>
	<monuments>
	<extinctions>

<atmosphere>
	<none>
	<ammonia>
	<oxygen>
	<mercury>
	<hydrogen>
	<dark-matter>

<geography>
	<ocean>
		<of some liquid (use atmosphere)>
	<desert>
	<volcanic>
	<rocky>
	<gaseous>
	<ice>
	<forest>
	<grasslands>
	<lush>
	<nuclear wasteland>
	<scoured-by-sun>

<monument>
	<description>
	<date>
	<who-or-what>

<historical-event>
	<war>
	<cataclysm>
	<raising>
	<spiriting-away>
	<funny-thing>
	<famous-invention>
	<birth of famous person>
	<birth of star>
	<death of star>
	<birth of planet>

<famous-invention>
	<name>
	<inventor>
	<first-use>
	<use>

<date>
	<number>
	<two-letter-abbreviation>
	<historic-event corresponding>

<spiriting-away>
	<name-of-universe>
	<date>

<alien-race>
	<length-of-existence>
	<extinct?>
	<lifespan>
	<composition>
	<intelligence>
	<spread>
	<type>
		<peaceful>
		<war-mongering>
		<asexual>
		<n-body-sexual>
		<n-morphic>
	<sports/games>
		<name>
		<number of players>
		<number of roles>
		<length of game>
		<deadliness>
		<number-of-players>
		<required-attributes>
			<chance>
			<skill>
			<strength>
			<intelligence>
		<number-per-season>
		<length-of-season>
		<finals>
		<best-player>
	<characteristics>
		<ways-of-sensing>
		<ways-of-communication>
		<ways-of-moving>
		<ways-of-gathering-energy>
			<directly-from-sun>
			<via-nuclear-energy>
			<collected-from-stars-or-planets>
	<famous-people>
	<historical-events>