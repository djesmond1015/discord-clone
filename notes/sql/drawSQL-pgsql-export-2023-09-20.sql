CREATE TABLE "Message"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "content" TEXT NOT NULL,
    "fileUrl" TEXT NULL,
    "memberId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
    "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
CREATE INDEX "message_memberid_channelid_index" ON
    "Message"("memberId", "channelId");
ALTER TABLE
    "Message" ADD PRIMARY KEY("id");
CREATE TABLE "Profile"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
    "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
ALTER TABLE
    "Profile" ADD PRIMARY KEY("id");
ALTER TABLE
    "Profile" ADD CONSTRAINT "profile_userid_unique" UNIQUE("userId");
CREATE TABLE "Member"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "role" VARCHAR(255) CHECK
        ("role" IN('')) NOT NULL DEFAULT 'MemberRole @default(GUEST)',
        "profileId" TEXT NOT NULL,
        "serverId" TEXT NOT NULL,
        "conversationInitiated" JSON NOT NULL,
        "conversationReceived" JSON NOT NULL,
        "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
        "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
CREATE INDEX "member_profileid_serverid_index" ON
    "Member"("profileId", "serverId");
ALTER TABLE
    "Member" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "Member"."role" IS 'GUEST, ADMIN, MODERATOR';
CREATE TABLE "Server"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
    "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
CREATE INDEX "server_profileid_index" ON
    "Server"("profileId");
ALTER TABLE
    "Server" ADD PRIMARY KEY("id");
ALTER TABLE
    "Server" ADD CONSTRAINT "server_invitecode_unique" UNIQUE("inviteCode");
CREATE TABLE "Conversation"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "memberOneId" TEXT NOT NULL,
    "memberTwoId" TEXT NOT NULL
);
CREATE INDEX "conversation_memberoneid_index" ON
    "Conversation"("memberOneId");
ALTER TABLE
    "Conversation" ADD CONSTRAINT "conversation_memberoneid_membertwoid_unique" UNIQUE("memberOneId", "memberTwoId");
ALTER TABLE
    "Conversation" ADD PRIMARY KEY("id");
CREATE TABLE "DirectMessage"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "content" TEXT NOT NULL,
    "fileUrl" TEXT NULL,
    "memberId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
    "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
CREATE INDEX "directmessage_memberid_conversationid_index" ON
    "DirectMessage"("memberId", "conversationId");
ALTER TABLE
    "DirectMessage" ADD PRIMARY KEY("id");
CREATE TABLE "Channel"(
    "id" TEXT NOT NULL DEFAULT 'uuid()',
    "name" TEXT NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('')) NOT NULL DEFAULT 'ChannelType',
        "profileId" TEXT NOT NULL,
        "serverId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'now()',
        "updatedAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT 'updatedAt()'
);
CREATE INDEX "channel_profileid_serverid_index" ON
    "Channel"("profileId", "serverId");
ALTER TABLE
    "Channel" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "Channel"."type" IS 'TEXT, AUDIO, VIDEO';
ALTER TABLE
    "Server" ADD CONSTRAINT "server_profileid_foreign" FOREIGN KEY("profileId") REFERENCES "Profile"("id");
ALTER TABLE
    "Member" ADD CONSTRAINT "member_profileid_foreign" FOREIGN KEY("profileId") REFERENCES "Profile"("id");
ALTER TABLE
    "DirectMessage" ADD CONSTRAINT "directmessage_conversationid_foreign" FOREIGN KEY("conversationId") REFERENCES "Conversation"("id");
ALTER TABLE
    "Message" ADD CONSTRAINT "message_channelid_foreign" FOREIGN KEY("channelId") REFERENCES "Channel"("id");
ALTER TABLE
    "Channel" ADD CONSTRAINT "channel_serverid_foreign" FOREIGN KEY("serverId") REFERENCES "Server"("id");
ALTER TABLE
    "Message" ADD CONSTRAINT "message_memberid_foreign" FOREIGN KEY("memberId") REFERENCES "Member"("id");
ALTER TABLE
    "Member" ADD CONSTRAINT "member_serverid_foreign" FOREIGN KEY("serverId") REFERENCES "Server"("id");
ALTER TABLE
    "Member" ADD CONSTRAINT "member_conversationinitiated_foreign" FOREIGN KEY("conversationInitiated") REFERENCES "Conversation"("id");
ALTER TABLE
    "Member" ADD CONSTRAINT "member_conversationreceived_foreign" FOREIGN KEY("conversationReceived") REFERENCES "Conversation"("id");
ALTER TABLE
    "Channel" ADD CONSTRAINT "channel_profileid_foreign" FOREIGN KEY("profileId") REFERENCES "Profile"("id");
ALTER TABLE
    "DirectMessage" ADD CONSTRAINT "directmessage_memberid_foreign" FOREIGN KEY("memberId") REFERENCES "Member"("id");