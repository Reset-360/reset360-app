import api from '@/lib/axios';
import { IAssessment, StartAssessmentData, SubmitAssessmentData } from '@/types/adapts';


/**
 * Save ADAPTS assessment
 *
 * @param {IAssessment} request
 * @return {*} 
 */
export const saveAssessmentResult = async (request: IAssessment) => {
  try {
    const { data } = await api.post('/assessments', request);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Save failed' };
  }
}

/**
 * Start ADAPTS assessment
 *
 * @param {StartAssessmentData} request
 * @return {*} 
 */
export const startAssessment = async (request: StartAssessmentData) => {
  try {
    const { data } = await api.post('/assessments/start', request);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Unable to start assessment' };
  }
}

/**
 * Save assessment progress periodically
 *
 * @export
 * @param {string} assessmentId
 * @param {{ answersDraft?: any; currentQuestionIndex?: number; timeSpentSec?: number }} payload
 * @return {*} 
 */
export async function patchAssessmentProgress(
  assessmentId: string,
  payload: { answersDraft?: any; currentQuestionIndex?: number; timeSpentSec?: number }
) {
  try {
    const { data } = await api.patch(`/assessments/${assessmentId}/progress`, payload);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Unable to start assessment' };
  }
}

/**
 * Submit ADAPTS assessment results
 *
 * @param {SubmitAssessmentData} request
 * @return {*} 
 */
export const submitAssessmentResult = async (id: string, request: SubmitAssessmentData) => {
  try {
    const { data } = await api.post(`/assessments/${id}/submit`, request);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Saving results failed' };
  }
}


/**
 * Fetch completed ADAPTS assessment(s) by user id
 *
 * @param {string} userId
 * @return {*} 
 */
export const getAssessmentByUserId = async (userId: string) => {
  try {
    const { data } = await api.get(`/assessments/user/${userId}`);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Fetch failed' };
  }
}

/**
 * Fetch completed ADAPTS assessment by user id
 *
 * @param {string} userId
 * @return {*} 
 */
export const getActiveAssessmentByUserId = async (userId: string) => {
  try {
    const { data } = await api.get(`/assessments/user/${userId}/active`);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Fetch failed' };
  }
}

/**
 * Fetch user ADAPTS entitlement / credits
 *
 * @param {string} userId
 * @return {*} 
 */
export const getAdaptsEntitlementByUserId = async (userId: string) => {
  try {
    const { data } = await api.get(`/entitlements/user/${userId}`);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Save failed' };
  }
}

/**
 * Redeem seat code
 *
 * @param {string} userId
 * @return {*} 
 */
export const redeemSeatCode = async (redeemData: { userId: string, code: string }) => {
  try {
    const { data } = await api.post(`/seat-codes/redeem`, redeemData);

    return data;
  } catch (error: any) {
    console.log(error)
    throw error.response?.data || { message: 'Redeem failed' };
  }
}
