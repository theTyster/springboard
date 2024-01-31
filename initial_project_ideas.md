# Fediverse Scheduling Tool

I'd like to talk about an idea I have for a capstone project.

I would like to make an application that consumes this API:

https://docs.joinmastodon.org/entities/ScheduledStatus/

# What is the fediverse?
If you haven't heard of mastodon, this will explain it as well as the larger federated network:

https://en.wikipedia.org/wiki/Fediverse

## TL;DR
The fediverse is a decentralized social network ecosystem with interconnected platforms.

The fediverse, short for "federated universe," refers to a network of interconnected social platforms or services that are based on the federated model. In the context of social media, these platforms allow users to create and share content, interact with others, and build communities. However, unlike traditional social media platforms, the fediverse is decentralized and operates through autonomous instances or servers.

Each instance within the fediverse has its own rules, policies, and moderation, allowing users to choose an instance that aligns with their preferences. Despite the separate instances, users can still connect with each other, follow and interact with individuals from other instances, and share content across the entire fediverse.

The fediverse promotes both diversity and user agency, aiming to provide a more open and democratic social media experience by avoiding the concentration of power in a few centralized platforms. Examples of platforms in the fediverse include Mastodon (a microblogging platform), PeerTube (a decentralized video hosting platform), and Diaspora (a distributed social networking service), among others.

# What is the idea?
I'd like to make a tool that allows people to schedule posts from the most popularly used platforms in the network. 

There have been a few attempts to do this in the past:

https://buffer.com/mastodon
https://towncrier.app/
https://publer.io/blog/schedule-mastodon-posts/


## Problems with existing tools
These tools are only tested for one type of platform on the network. It's possible that they work for others, but support could be spotty.

These tools also don't seem to utilize the native API existent on these platforms' backend which allows scheduling posts.

The companies listed above aren't using the existing API. Instead, they simply store the post on their own servers and then post it on behalf of the account owner at the appointed time.

However, there does exist one tool that is not attached to a freemium social media management site.
https://www.scheduler.mastodon.tools/

This tool apparently hasn't been updated in several years, is not very feature rich, and requires a bit more technical knowledge to use. Requiring users to manually generate their own API Access token. It also only seems to target mastodon instances instead of the wider network. Again, it may work for other software, but could be spotty.

Additional Points:
- Many users on the network are FOSS purists who don't like to use proprietary software.
- Many users have an account on Mastodon and also have an account on another node using different software.
-  ~ 40% of the network uses a software other than mastodon.
-  Although there are LOTS of options for front ends on the fediverse, almost NONE natively use the scheduling API.

For my first capstone project in this bootcamp, I would like to create what, I believe, would be the first tool allowing users to sign in to multiple federated accounts and schedule posts to all of them regardless of the software that node is running.
