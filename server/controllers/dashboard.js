const Request = require("../models/Requests");
const Student = require("../models/Students");
const DocType = require("../models/DocTypes");

exports.getDashboard = async (req, res, next) => {
  const totalRequests = await Request.find().countDocuments();
  const totalStudents = await Student.find().countDocuments();
  const totalDocTypes = await DocType.find({
    "title": { $ne: "Reclamation" },
  }).countDocuments();
  const approvedRequests = await Request.aggregate([
    {
      $lookup: {
        from: "doctypes",
        localField: "docType",
        foreignField: "_id",
        as: "docTypeData",
      },
    },
    {
      $match: {
        status: "Accepted",
        "docTypeData.title": { $ne: "Reclamation" },
      },
    },
    {
      $count: "count",
    },
  ]);

  const pendingRequests = await Request.aggregate([
    {
      $lookup: {
        from: "doctypes",
        localField: "docType",
        foreignField: "_id",
        as: "docTypeData",
      },
    },
    {
      $match: {
        status: "Pending",
        "docTypeData.title": { $ne: "Reclamation" },
      },
    },
    {
      $count: "count",
    },
  ]);

  const rejectedRequests = await Request.aggregate([
    {
      $lookup: {
        from: "doctypes",
        localField: "docType",
        foreignField: "_id",
        as: "docTypeData",
      },
    },
    {
      $match: {
        status: "Rejected",
        "docTypeData.title": { $ne: "Reclamation" },
      },
    },
    {
      $count: "count",
    },
  ]);

  const totalReclamations = await Request.aggregate([
    {
      $lookup: {
        from: "doctypes",
        localField: "docType",
        foreignField: "_id",
        as: "docTypeData",
      },
    },
    {
      $match: {
        "docTypeData.title": "Reclamation",
      },
    },
    {
      $count: "count",
    },
  ]);

  // Retrieve the counts from the aggregation results
  const approvedRequestsCount = approvedRequests.length > 0 ? approvedRequests[0].count : 0;
  const pendingRequestsCount = pendingRequests.length > 0 ? pendingRequests[0].count : 0;
  const rejectedRequestsCount = rejectedRequests.length > 0 ? rejectedRequests[0].count : 0;
  const totalReclamationsCount = totalReclamations.length > 0 ? totalReclamations[0].count : 0;

  const appStats = {
    "Total Requests": totalRequests,
    "Total Students": totalStudents,
    "Total DocTypes": totalDocTypes,
    "Approved Requests": approvedRequestsCount,
    "Pending Requests": pendingRequestsCount,
    "Rejected Requests": rejectedRequestsCount,
    "Total Reclamations": totalReclamationsCount,
  };

  res.status(200).json({
    message: "Fetched dashboard successfully.",
    appStats: appStats,
  });
};