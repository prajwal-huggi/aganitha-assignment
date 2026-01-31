const { DataTypes } = require("sequelize");
const sequelize= require("../db.js")

const Paste = sequelize.define(
  "aganitha-table",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    max_views: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: "pastes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

module.exports= Paste;
